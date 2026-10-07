/** @author Jason Santos
 * A Chore instance represents a task that needs to be completed by a user.
 * It includes data such as task description, due date, completion status, and other properties
 *    that aligns with the rest of the chore app.
 */
class Chore {
    #task;
    #category;
    #description;
    #isComplete;
    #taskPoints;
    #dueDate;

    /**
     * Creates a Chore instance with the input task, description, completion status, and task points.
     * @param {string} task 
     * @param {string} category
     * @param {string} description
     * @param {bool} isComplete 
     * @param {int} taskPoints 
     * @param {Date} dueDate, can be null if no due date is specified.
     */
    constructor(task, category, description, isComplete, taskPoints, dueDate) {
        this.#category = category;
        this.#task = task;
        this.#description = description;
        this.#isComplete = isComplete;
        this.#taskPoints = taskPoints;
        this.#dueDate = dueDate;
    }

    get task() {
        return this.#task;
    }

    get category() {
        return this.#category;
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
        // dueDate is null, the due date is not specified
        if (this.#dueDate == null) throw new Error("No due date for chore: " + this.#task);
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

    set category(value) {
        this.#category = value;
    }

    set description(value) {
        this.#description = value;
    }

    /**
     * Returns whether the chore is overdue based on its due date.
     * @returns {bool} True if the chore is overdue, false otherwise.
     */
    isOverdue() {
        if (new Date() > this.#dueDate && !this.#isComplete) return true;
        return false;
    }

    /**
     * Returns the amount of days this chore is overdue.
     * @returns {int} The number of days the chore is overdue if not complete.
     * @returns {-1} If the chore is not overdue.
     */
    daysOverdue() {
        if (!this.isOverdue()) return -1;
        const now = new Date();
        const diffDays = Math.floor((now - this.#dueDate) / (1000 * 60 * 60 * 24));
        return diffDays;
    }
}