class Vector {
    static add( vector1, vector2 ) {
        return new Vector( vector1.x + vector2.x, vector1.y + vector2.y )
    }
    static subtract( vector1, vector2 ) {
        return new Vector( vector1.x - vector2.x, vector1.y - vector2.y )
    }

    constructor(x, y) {
        this._x = x
        this._y = y
    }

    set x( x ) { 
        this._x = x 
    }
    get x() { 
        return this._x 
    }

    set y( y ) {
        this._y = y
    }
    get y() {
        return this._y
    }

    add( vector ) {
        this.x += vector.x
        this.y += vector.y
    }

    subtract( vector ) {
        
    }
}