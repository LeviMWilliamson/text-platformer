class Vector {
    /**
     * @param {Vector} vector1
     * @param {Vector} vector2
     * @returns {Vector} The sum of two vectors.
     */
    static add( vector1, vector2 ) {
        return new Vector( vector1.x + vector2.x, vector1.y + vector2.y )
    }
    /**
     * @param {Vector} vector1
     * @param {Vector} vector2
     * @returns {Vector} The 1st vector minus the 2nd vector.
     */
    static subtract( vector1, vector2 ) {
        return new Vector( vector1.x - vector2.x, vector1.y - vector2.y )
    }
    /**
     * Performs a dot product on two vectors.
     * @param {Vector} vector1
     * @param {Vector} vector2
     * @returns {number} The magnitude of the projection of one vector onto another.
     */
    static dot( vector1, vector2 ) {
        return vector1.x*vector2.x + vector1.y*vector2.y
    }
    /**
     * Performs a 3D cross-product on 2D vectors by assuming that the z-value of both vectors is zero.
     * The scalar output represents the z-value of the cross-product vector.
     * This output is appropriate because 
     * @param {Vector} vector1 
     * @param {Vector} vector2 
     * @returns {number}
     */
    static cross( vector1, vector2 ) {
        return vector1.x*vector2.y - vector1.y*vector2.x
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

    /**
     * Future implementation idea:
     * Would it be useful to cache this value?
     */
    get magnitude() {
        return Math.sqrt( this.x**2 + this.y**2 )
    }

    get normalized() {
        const magnitude = this.magnitude
        return new Vector( this.x/magnitude, this.y/magnitude )
    }

    add( vector ) {
        this.x += vector.x
        this.y += vector.y
    }

    subtract( vector ) {
        this.x -= vector.x
        this.y -= vector.y
    }


}