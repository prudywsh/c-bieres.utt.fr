import React from 'react'
import createReactClass from 'create-react-class'
import SelectList from './SelectList'
import Loader from './Loader'

const AddAdmin = ({ matches, showForm, toggle, fetchMatches, addAdmin, fetchingMatches }) => {
  if (!showForm) {
    return (
      <div>
        <button type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={toggle}>
          Ajouter un administrateur
        </button>
      </div>
    )
  }

  return (
    <div>
      <button type="button"
              className="btn btn-danger btn-lg btn-block"
              onClick={toggle}>
        Annuler
      </button>
      <form>
        <br />
        <div className="form-group">
          <label htmlFor="name">Nom, prénom, surnom ou email</label>
          <input
            type="text"
            onChange={e => fetchMatches(e.target.value)}
            className="form-control"
            id="pattern" />
        </div>
        {
          fetchingMatches
            ? <Loader />
            : <SelectList items={matches} onClick={addAdmin} />
        }
      </form>
    </div>
  )
}

export default AddAdmin
