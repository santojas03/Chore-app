/** @author Jason Santos
 * A User instance represents a user that interacts with the Chore app.
 * It includes data such as the user's name, total points, and other relevant information.
 */
class User {
    #name;
    #totalPoints;
    #numCompletedChores;
    #numIncompleteChores;

    //#companion; // user's companion object.

    constructor(name, totalPoints, numCompletedChores, numIncompleteChores) {
        this.#name = name;
        this.#totalPoints = totalPoints;
        this.#numCompletedChores = numCompletedChores;
        this.#numIncompleteChores = numIncompleteChores;
    }

    get name() {
        return this.#name;
    }

    get totalPoints() {
        return this.#totalPoints;
    }

    get numCompletedChores() {
        return this.#numCompletedChores;
    }
    
    get numIncompleteChores() {
        return this.#numIncompleteChores;
    }

    set name(name) {
        this.#name = name;
    }

    set totalPoints(totalPoints) {
        this.#totalPoints = totalPoints;
    }

    set numCompletedChores(numCompletedChores) {
        this.#numCompletedChores = numCompletedChores;
    }
    
    set numIncompleteChores(numIncompleteChores) {
        this.#numIncompleteChores = numIncompleteChores;
    }
}