import AppDispatcher from '../dispatchers/AppDispatcher';
import EventService from '../services/EventService';

export default {

    getEvents() {
        EventService.get()
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'GET_EVENTS',
                    events: response.data
                });
            })
            .catch(err => console.error(err));
    },

    getEvent(id) {
        EventService.getById(id)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'GET_EVENT',
                    event: response.data
                });
            })
            .catch(err => console.log(err));
    },

    getNextEvent() {
        EventService.getNext()
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'GET_EVENT',
                    event: response.data
                });
            })
            .catch(err => console.log(err));
    },

    createEvent(data) {
        EventService.create(data)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'CREATE_EVENT',
                    event: response.data
                });
            })
            .catch(err => console.error(err));
    },

    updateEvent(id, data) {
        EventService.update(id, data)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'UPDATE_EVENT',
                    event: response.data
                });
            })
            .catch(err => console.error(err));
    },

    deleteEvent(id) {
        EventService.delete(id)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'DELETE_EVENT',
                    id
                });
            })
            .catch(err => console.error(err));
    }

}