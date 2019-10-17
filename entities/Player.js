class Player extends Entity {
    constructor(X,Y)
    {
        super(X,Y,5,3);
    }
    
    move(k)
    {
        switch(k)
        {
        case 65:
            if(this.tool)
            this.state = "running_left_equipped";
            else
            this.state = "running_left";

            this.velocityX = -1;
            this.direction = -1;
            break;
        case 68:
            if(this.tool)
            this.state = "running_right_equipped"
            else
            this.state = "running_right";

            this.velocityX = 1;
            this.direction = 1;
            break;
        case 87:
            this.state = this.direction>0?"jumping_right":"jumping_left";
            this.jump();
            break;
        case 83:
            this.state = "freefall";
            this.velocityY = 1;
            break;
        case 88:
            this.state = this.direction>0?"punching_right":"punching_left";
            this.velocityX = 0;
            break;
        case 67:
            this.state = this.direction>0?"kicking_right":"kicking_left";
            this.velocityX = 0;
            break;
        case 90:
            if(this.tool)
            this.unequip();
            else
            this.equip(new Tool('|','7'))
            break;
        case 32:
            if(this.tool)
            {
            this.state = this.direction>0?"use_tool_right":"use_tool_left";
            this.tool.project(this.direction, 
                                (this.direction > 0)? this.X+this.width : this.X-1, 
                                this.Y+1);

            }
            break;
        }
    };

    cease(k)
    {
        switch(k)
        {
        case 65:
            this.velocityX = 0;
            break;
        case 68:
            this.velocityX = 0;
            break;
        case 87:
            this.velocityY = 0;
            break;
        case 83:
            this.velocityY = 0;
            break;
        }

        if(this.velocityX == 0)
        {
        if(this.tool)
        {
            if(this.direction == -1)
            this.state = "idle_equipped_left";
            if(this.direction == 1)
            this.state = "idle_equipped_right"
        }
        else
            this.state = "idle";
        }

        if(this.velocityY==0 && this.velocityX != 0)
        this.state = this.tool?(this.direction>0?"running_right_equipped":"running_left_equipped"):(this.direction>0?"running_right":"running_left");

    };
}