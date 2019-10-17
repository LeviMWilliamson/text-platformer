class Tool {
    constructor(sprite, projectile) {
        this.sprite = sprite;
        this.projectile = projectile;
        
        this.maxTravel = 1;
        this.travel = 0;
    }

    project(direction, X, Y) {
        let projectile = Object.create(this);
        
        projectile.direction = direction;
        projectile.X = X;
        projectile.Y = Y;

        world.push(projectile);
    }

    clear() {
        world_matrix[this.X][this.Y] = ' ';
    }

    step() {
        if(++this.travel <= this.maxTravel)
        this.X += this.direction;
        else
        {
        this.clear();
        delete world[world.indexOf(this)];
        }
    }

    render() {
        world_matrix[this.X][this.Y] = this.projectile;
    }
}