/** @author Jason Santos
 * A User instance represents a user that interacts with the Chore app.
 * It includes data such as the user's name, total points, and other relevant information.
 */
class User {
    #name;
    #totalPoints;
    #numCompletedChores;

    constructor(name, totalPoints, numCompletedChores) {
        this.#name = name;
        this.#totalPoints = totalPoints;
        this.#numCompletedChores = numCompletedChores;
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

    set name(name) {
        this.#name = name;
    }

    set totalPoints(totalPoints) {
        this.#totalPoints = totalPoints;
    }

    set numCompletedChores(numCompletedChores) {
        this.#numCompletedChores = numCompletedChores;
    }
}