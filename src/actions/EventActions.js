import AppDispatcher from '../dispatchers/AppDispatcher';
import EventService from '../services/EventService';
import registrationHelper from '../helpers/localStorage/registrationHelper';
import toastHelper from '../helpers/toastHelper';

export default {

    /**
     * Unregister a user to the next event, by his
     * authorization_code or id
     *
     - @param {object}
     */
    unregister(data) {
        EventService.unregister(data)
            .then(response => {
                // remove the registration from localStorage
                registrationHelper.clean();

                toastHelper.success("Desinscription réussie.");

                AppDispatcher.dispatch({
                    type: 'UNREGISTERED',
                    drinker: response.data.drinker,
                    event: response.data.event
                });
            })
            .catch(err => console.log(err));
    },

    unregisterById(data) {
        EventService.unregisterById(data)
            .then(response => {
                toastHelper.success("Desinscription réussie.");

                AppDispatcher.dispatch({
                    type: 'UNREGISTERED',
                    drinker: response.data.drinker,
                    event: response.data.event
                });
            })
            .catch(err => console.log(err));
    },

    /**
     * Register a drinker to the an event by his database ID
     *
     * @param {object} data
     */
    registerById(data) {
        EventService.registerById(data)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'REGISTERED',
                    drinker: response.data.drinker,
                    event: response.data.event
                });

                toastHelper.success("Inscription réussie !");
            })
            .catch(err => console.error(err));
    },

    /**
     * Register a user to the next event, by his
     * authorization_code
     *
     - @param {string} authorization_code
     */
    register(authorization_code) {
        EventService.register(authorization_code)
            .then(response => {
                // save the registration in localStorage
                registrationHelper.set(response.data.event._id);

                toastHelper.success("Inscription réussie.");

                AppDispatcher.dispatch({
                    type: 'REGISTERED',
                    drinker: response.data.drinker,
                    event: response.data.event
                });
            })
            .catch(err => {
                if (err.response.status == 409) {
                    // save the registration in localStorage
                    registrationHelper.set(err.response.data.event._id);

                    toastHelper.info("Tu es déjà inscrit !");

                    AppDispatcher.dispatch({
                        type: 'REGISTER',
                    });
                }
            });
    },

    getEvents(query) {
        EventService.get(query)
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
                toastHelper.success("Évènement créé.");
            })
            .catch(err => {
                console.error(err);
                toastHelper.error("Echec lors de la création de l'évènement");
            });
    },

    updateEvent(id, data) {
        EventService.update(id, data)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'UPDATE_EVENT',
                    event: response.data
                });
                toastHelper.success("Évènement mis à jour.");
            })
            .catch(err => {
                console.error(err);
                toastHelper.error("Echec lors de la mise à jour de l'évènement");
            });
    },

    deleteEvent(id) {
        EventService.delete(id)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'DELETE_EVENT',
                    id
                });

                toastHelper.success("Évènement supprimé.");
            })
            .catch(err => console.error(err));
    }

}
