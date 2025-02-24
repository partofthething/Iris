import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uriType } from '../../util/helpers';
import Icon from '../Icon';
import { i18n } from '../../locale';
import { encodeUri } from '../../util/format';

const SearchForm = ({
  term: termProp,
  onBlur: doBlur,
  onReset: doReset,
  onSubmit: doSubmit,
}) => {
  const history = useHistory();
  const [term, setTerm] = useState(termProp);
  const [dirty, setDirty] = useState();

  useEffect(
    () => {
      if (termProp && !dirty) setTerm(termProp);
    },
    [termProp],
  );

  const onChange = (e) => {
    setTerm(e.target.value);
    setDirty(true);
  };

  const onBlur = () => {
    setDirty(true);
    if (doBlur) {
      doBlur(term);
    }
  }

  const onFocus = () => setDirty(true);

  const onSubmit = (e) => {
    e.preventDefault();

    // check for uri type matching
    switch (uriType(term)) {
      case 'album':
        history.push(`/album/${encodeUri(term)}`);
        break;

      case 'artist':
        history.push(`/artist/${encodeUri(term)}`);
        break;

      case 'playlist':
        history.push(`/playlist/${encodeUri(term)}`);
        break;

      case 'track':
        history.push(`/track/${encodeUri(term)}`);
        break;

      default:
        doSubmit(term);
        break;
    }

    return false;
  };

  const onReset = () => {
    setDirty(false);
    setTerm('');
    if (doReset) doReset();
  }

  return (
    <form className="search-form" onSubmit={onSubmit}>
      <label>
        <input
          type="text"
          placeholder={i18n('fields.search')}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          value={term}
        />
      </label>
      {term && (
        <Icon name="close" className="search-form__reset" onClick={onReset} />
      )}
    </form>
  );
};

export default SearchForm;
