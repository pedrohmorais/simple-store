const renderParams = (params) => {
  return encodeURI(Object.keys(params).map(p => {
    const vl = params[p];
    return `${p}=${vl}`;
  }).join('&'));
}

export {
  renderParams,
}