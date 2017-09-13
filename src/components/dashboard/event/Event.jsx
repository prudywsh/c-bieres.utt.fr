import React from 'react';

import { Link } from 'react-router-dom';

import EventService from '../../../services/EventService';

export default class Event extends React.Component {

    constructor() {
        super();

        this.state = {
            showCreateForm: false,
            name: "",
            date: "",
            events: []
        };

        this._toggleCreateForm = this._toggleCreateForm.bind(this);
        this._handleNameChange = this._handleNameChange.bind(this);
        this._handleDateChange = this._handleDateChange.bind(this);
        this._submitCreateForm = this._submitCreateForm.bind(this);
        this._deleteEvent = this._deleteEvent.bind(this);
    }

    componentDidMount() {
        EventService.get()
            .then(response => this.setState({ events: response.data }))
            .catch(err => console.error(err));
    }

    _toggleCreateForm() {
        this.setState({ showCreateForm: !this.state.showCreateForm });
    }

    _submitCreateForm() {
        EventService.create({
            name: this.state.name,
            when: this.state.date
        })
        .then(response => {
            let events = this.state.events;
            events.push(response.data);
            this.setState({ events, showCreateForm: false })
        })
        .catch(err => console.error(err));
    }

    _deleteEvent(id) {
        EventService.delete(id)
        .then(response => this.setState({ events: this.state.events.filter(event => event._id !== id) }))
        .catch(err => console.error(err));
    }

    _handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    _handleDateChange(event) {
        this.setState({ date: event.target.value });
    }

    render() {
        return (
            <div>
                <h1>Evènements</h1>
                <div>
                    <button type="button" onClick={this._toggleCreateForm} className="btn btn-primary btn-lg btn-block">
                        Créer un évènement
                    </button>
                    {
                        this.state.showCreateForm
                        ?
                            <div className="custom-form-container">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="name">Nom</label>
                                        <input type="text" onChange={this._handleNameChange} className="form-control" id="name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="date">Date</label>
                                        <input type="date" onChange={this._handleDateChange} className="form-control" id="date" />
                                    </div>
                                    <button type="submit" onClick={this._submitCreateForm} className="btn btn-success btn-lg">Créer</button>
                                </form>
                            </div>
                        :
                            null
                    }
                </div>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.events.map(event => {
                                    let eventDate = new Date(event.when);
                                    return  <tr key={event._id}>
                                                <td>{event.name}</td>
                                                <td>{`${eventDate.getUTCDate()}/${eventDate.getUTCMonth() + 1}/${eventDate.getUTCFullYear()}`}</td>
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="actions">
                                                        <Link className="btn btn-success"role="button" to={`/dashboard/event/${event._id}/update`}>Modifier</Link>
                                                        <button type="button" onClick={_ => this._deleteEvent(event._id)} className="btn btn-danger">
                                                            Supprimer
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}
