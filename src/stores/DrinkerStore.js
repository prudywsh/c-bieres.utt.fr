import BaseStore from './BaseStore';

class DrinkerStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._handleActions.bind(this));

        this._data = {};
    }

    get drinkers() {
        return Object.values(this._data);
    }

    _insert(e) {
        this._data[e._id] = e;
    }

    /**
     * Handle Actions from DrinkerActions
     *
     * @param {object} action
     */
    _handleActions(action) {
        switch(action.type) {
            case "DRINKER_FETCHED":
                action.drinkers.map(d => this._insert(d));
                this.emitChange();
                break;
        }
    }

}

export default new DrinkerStore();