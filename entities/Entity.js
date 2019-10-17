class Entity
    {
    constructor(X, Y, width, height)
    {
        this.X = X;
        this.Y = Y;

        this.velocityX = 0;
        this.velocityY = 0;

        this.height = height;
        this.width = width;

        this.state = 'idle';
        this.steps = 0;
        this.direction = 0;

        this.jumpHeight = -4;

        this.tool = null;
        this.loadSprites();
    }

    loadSprites()
    {
        this.sprites = {
        "idle":
            [["  o  ",
            " /|\\ ",
            " / \\ "]],


        "running_right":
            [["  o  ",
            " /|\\ ",
            " / \\ "],

            ["  o  ",
            " ||\\ ",
            " /|  "],
                        
            ["  o  ",
            " /|\\_ ",
            " -|  "],
                        
            ["  o  ",
            " ||  ",
            " >|  "]],
                        
        "running_left":
            [["  o  ",
            " /|\\ ",
            " / \\ "],
            
            ["  o  ",
            " /|| ",
            "  |\\ "],

            ["  o  ",
            "_/|\\ ",
            "  |- "],

            ["  o  ",
            " ||  ",
            "  |< "]],

        "freefall":
            [[" \\o/ ",
            "  |  ",
            " / \\ "]],

        "jumping_right":
            [["  o/ ",
            " /|  ",
            " //  "]],

        "jumping_left":
            [[" \\o  ",
            "  |\\ ",
            "  \\\\ "]],

        "wallslide_right":
        [["  o/ ",
            " /|  ",
            "  \\\\ "]],
        
        "wallslide_left":
        [[" \\o  ",
            "  |\\  ",
            " //  "]],
        
        "trip_right":
        [["  o  ",
            " //  ",
            " /   "]],

        "trip_left":
        [["  o  ",
            "  \\\\ ",
            "  \\  "]],

        "idle_equipped_right":
            [["  o  ",
            " /|L.",
            " / \\ "]],

        "idle_equipped_left":
            [["  o  ",
            ".⅃|\\ ",
            " / \\ "]],


        "running_left_equipped":
            [["  o  ",
            ".⅃|\\  ",
            " / \\ "],
                            
            ["  o  ",
            "./|| ",
            "  |\\ "],

            ["  o  ",
            ".⅃|\\ ",
            " | - "],
            
            ["  o  ",
            "./|  ",  
            "  |< "]],

        "running_right_equipped":
            [["  o  ",
            " /|L.",
            " / \\ "],

            ["  o  ",
            " ||\\.",
            " /|  "],
                        
            ["  o  ",
            " /|L.",
            " -|  "],
                        
            ["  o  ",
            "  |\\.",
            " >|  "]],

        "punching_right":
            [["  o  ",
            " /|\\ ",
            " / \\ "],
            
            ["  o  ",
            "  |= ",
            " / \\ "],

            ["  o  ",
            " /|-=",
            " / \\ "]],
            
        "punching_left":
            [["  o  ",
            " /|\\ ",
            " / \\ "],
            
            ["  o  ",
            " =|  ",
            " / \\ "],

            ["  o  ",
            "=-|\\ ",
            " / \\ "]],
            
        "kicking_left":
            [["  o  ",
            " /|\\ ",
            " / \\ "],
            
            ["  o  ",
            " /|\\ ",
            " ʽ \\ "],

            ["  o  ",
            " .|  ",
            "-= \\ "],

            ["  o  ",
            " /|\\ ",
            " ʽ \\ "]],

        "kicking_right":
            [["  o  ",
            " /|\\ ",
            " / \\ "],
            
            ["  o  ",
            " /|\\ ",
            " / , "],

            ["  o  ",
            " /|. ",
            " / =-"],

            ["  o  ",
            " /|\\ ",
            " / , "]],
        
        "use_tool_right":
            [["  o  ",
            " /|L.",
            " / \\ "],
            
            ["  o  ",
            " /|\\_",
            " / \\ "],
            
            ["  o  ",
            " /|=-",
            " / \\ "]],
            
        "use_tool_left":
            [["  o  ",
            ".⅃|\\ ",
            " / \\ "],
            
            ["  o  ",
            "_/|\\ ",
            " / \\ "],
            
            ["  o  ",
            "-=|\\ ",
            " / \\ "]]
            
        };
    };

    clear()
    {
        for(var i=0; i<this.width; i++)
        for(var j=0; j<this.height; j++)
            world_matrix[this.X+i][this.Y+j] = ' ';
    }

    render()
    {
        if(this.steps < this.sprites[this.state].length-1)
        this.steps++;
        else
        this.steps = 0;

        for(var i=0; i<this.height; i++)
        for(var j=0; j<this.width; j++)
            world_matrix[this.X+j][this.Y+i] =  this.sprites[this.state][this.steps][i][j];
    }

    gravitate()
    {
        if(this.velocityY < 1)
        this.velocityY++;
    }

    jump()
    {
        //Check wallslides.
        if(world_matrix[this.X-1][this.Y] != ' ')
        {
        this.velocityY = this.jumpHeight;
        this.velocityX = 1;
        return;
        }
        if(world_matrix[this.X+this.width][this.Y] != ' ')
        {
        this.velocityY = this.jumpHeight
        this.velocityX = -1;
        return;
        }

        //Check for ground.
        for(let i=0; i<this.width; i++)
        if(world_matrix[this.X+i][this.Y+this.height] != ' ')
        {
            this.velocityY = this.jumpHeight;
            return;
        }
    }

    fall()
    {
        if(world_matrix[this.X-1][this.Y] != ' ')
        this.state = 'wallslide_left';
        else if(world_matrix[this.X+this.width][this.Y] != ' ')
        this.state = 'wallslide_right';
        else
        this.state = 'freefall';
    }

    step()
    {
        this.gravitate();

        var moveX = true;
        var moveY = true;

        if(this.velocityX>0)
        for(var i=0; i<this.height; i++)
            if(world_matrix[this.X+this.width-1+this.velocityX][this.Y+i] != ' ')
            moveX = false;

        if(this.velocityX<0)
        for(var i=0; i<this.height; i++)
            if(world_matrix[this.X+this.velocityX][this.Y+i] != ' ')
            moveX = false;

        if(this.velocityY>0)
        for(var i=0; i<this.width; i++)
            if(world_matrix[this.X+i][this.Y+this.height-1+this.velocityY] != ' ')
            moveY = false;

        if(this.velocityY<0)
        for(var i=0; i<this.width; i++)
            if(world_matrix[this.X+i][this.Y+this.velocityY] != ' ')
            moveY = false;

        //TO-DO: Check diagonal points.

        if(moveX && moveY)
        {
        if(this.velocityX<0 && this.velocityY<0)
            if(world_matrix[this.X+this.velocityX][this.Y+this.velocityY] != ' ')
            return;

        if(this.velocityX>0 && this.velocityY<0)
            if(world_matrix[this.X+this.width-1+this.velocityX][this.Y+this.velocityY] != ' ')
            return;

        if(this.velocityX<0 && this.velocityY>0)
            if(world_matrix[this.X+this.velocityX][this.Y+this.height-1+this.velocityY] != ' ')
            return;

        if(this.velocityX>0 && this.velocityY>0)
            if(world_matrix[this.X+this.width-1+this.velocityX][this.Y+this.height-1+this.velocityY] != ' ')
            return;
        }
    
        if(moveX)
        this.X += this.velocityX;
        if(moveY)
        this.Y += this.velocityY;

        if(!moveY && moveX)
        {
        let surfaces = 0;
        for(let i=0; i<this.width && surfaces<2; i++)
            if(world_matrix[this.X+i][this.Y+this.height] != ' ')
                surfaces++;

        if(surfaces == 1)
        {
            if(world_matrix[this.X][this.Y+this.height] != ' ')
            {
            this.state = "trip_right";
            this.X += 1;
            }
            else if(world_matrix[this.X+this.width][this.Y+this.height] != ' ')
            {
            this.state ="trip_left";
            this.X -= 1;
            }
        }

        }

        if(moveY && this.velocityY > 0)
        this.fall();
        else if( (!this.velocityY || !moveY) && (!this.velocityX || !moveX) && this.state == "freefall")
        this.state = "idle";
    }

    equip(tool)
    {
        if(tool instanceof Tool)
        {
        this.tool = tool;
        var i;
        for(i=0; i<this.sprites.running_right_equipped.length; i++)
        {
            this.sprites["running_right_equipped"][i][0] = this.sprites["running_right_equipped"][i][0].substring(0,4) + tool.sprite + ' ';
            this.sprites["running_left_equipped"][i][0] = tool.sprite + this.sprites["running_left_equipped"][i][0].substring(1,6);
        }
        for(i=0; i<this.sprites.idle_equipped_right.length; i++)
        {
            this.sprites["idle_equipped_right"][i][0] = this.sprites["idle_equipped_right"][i][0].substring(0,4) + tool.sprite + ' ';
            this.sprites["idle_equipped_left"][i][0] = tool.sprite + this.sprites["idle_equipped_left"][i][0].substring(1,6);
        }

        /*for(i=0; i<this.sprites.use_tool_right.length-1; i++)
        {
            this.sprites["use_tool_right"][i][0] = this.sprites["use_tool_right"][i][0].substring(0,4) + item + ' ';
            this.sprites["use_tool_left"][i][0] = item + this.sprites["use_tool_left"][i][0].substring(1,6);
        }
        this.sprites["use_tool_right"][i][0] = this.sprites["use_tool_right"][i][0].substring(0,4) + '* ';
        this.sprites["use_tool_left"][i][0] = '*' + this.sprites["use_tool_left"][i][0].substring(1,6);*/
        }
        else
        {
        alert('You can only equip tools.');
        }
    };

    unequip()
    {
        this.tool = null;
        for(var i=0; i<this.sprites.running_right_equipped.length; i++)
        {
        this.sprites["running_right_equipped"][i][0] = this.sprites["running_right_equipped"][i][0].substring(0,4) + '  ';
        this.sprites["running_left_equipped"][i][0] = ' '+this.sprites["running_left_equipped"][i][0].substring(1,6);
        }
        for(var i=0; i<this.sprites.idle_equipped_right.length; i++)
        {
        this.sprites["idle_equipped_right"][i][0] = this.sprites["idle_equipped_right"][i][0].substring(0,4) + '  ';
        this.sprites["idle_equipped_left"][i][0] = ' '+this.sprites["idle_equipped_left"][i][0].substring(1,6);
        }
        for(var i=0; i<this.sprites.use_tool_right.length; i++)
        {
        this.sprites["use_tool_right"][i][0] = this.sprites["use_tool_right"][i][0].substring(0,4) + '  ';
        this.sprites["use_tool_left"][i][0] = ' '+this.sprites["use_tool_left"][i][0].substring(1,6);
        }
    };
}