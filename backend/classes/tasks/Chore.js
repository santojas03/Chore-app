/** @author Jason Santos
 * A Chore instance represents a task that needs to be completed by a user.
 * It includes data such as task description, due date, completion status, and other properties
 *    that aligns with the rest of the chore app.
 */
class Chore {
    #task;
    #description;
    #isComplete;
    #taskPoints;
    #dueDate;

    /**
     * Creates a Chore instance with the input task, description, completion status, and task points.
     * @param {*} task 
     * @param {*} description 
     * @param {*} isComplete 
     * @param {*} taskPoints 
     */
    constructor(task, description, isComplete, taskPoints) {
        this.#task = task;
        this.#description = description;
        this.#isComplete = isComplete;
        this.#taskPoints = taskPoints;

        // Initialize the due date to the current date.
        this.#dueDate = new Date();
    }

    get task() {
        return this.#task;
    }

    get description() {
        return this.#description;
    }

    get isComplete() {
        return this.#isComplete;
    }

    get taskPoints() {
        return this.#taskPoints;
    }
    
    get dueDate() {
        return this.#dueDate;
    }

    set dueDate(value) {
        this.#dueDate = value;
    }

    set isComplete(value) {
        this.#isComplete = value;
    }

    set taskPoints(value) {
        this.#taskPoints = value;
    }

    set task(value) {
        this.#task = value;
    }

    set description(value) {
        this.#description = value;
    }

    /**
     * Returns whether the chore is overdue based on its due date.
     * @returns {boolean} True if the chore is overdue, false otherwise.
     */
    isOverdue() {
        if (new Date() > this.#dueDate && !this.#isComplete) return true;
        return false;
    }

    /**
     * Returns the amount of days this chore is overdue.
     * @returns {number} The number of days the chore is overdue if not complete.
     * @returns {-1} If the chore is not overdue.
     */
    daysOverdue() {
        if (!this.isOverdue()) return -1;
        const now = new Date();
        const diffDays = Math.floor((now - this.#dueDate) / (1000 * 60 * 60 * 24));
        return diffDays;
    }
}