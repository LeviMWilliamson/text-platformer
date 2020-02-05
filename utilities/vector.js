/**
 * The Vector class is a mutable 2D vector data type use to represent 2D coordinates.
 */
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
     * This output is appropriate because the 3D output would not contain x and y values.
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
     * @returns {number} The magnitude of the vector.
     */
    get magnitude() {
        /**
         * Future implementation idea:
         * Would it be useful to cache this value?
         */
        return Math.sqrt( this.x**2 + this.y**2 )
    }

    /**
     * @returns {Vector} The current vector normalized; made to have a magnitude of one; a unit vector.
     */
    get normalized() {
        const magnitude = this.magnitude
        return new Vector( this.x/magnitude, this.y/magnitude )
    }

    /**
     * Add another vector to this vector.
     * @param {Vector} vector 
     */
    add( vector ) {
        this.x += vector.x
        this.y += vector.y
    }

    /**
     * Subtract another vector from this vector.
     * @param {Vector} vector 
     */
    subtract( vector ) {
        this.x -= vector.x
        this.y -= vector.y
    }


}