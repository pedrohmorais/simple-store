const getSubmitValues = (event) => {
  event.preventDefault();
  const els = event.target.elements;
  const formValues = {};
  for (let i = 0;i < els.length; i++) {
    const el = els[i];
    const attrName = el.getAttribute('name');
    const attrValue = el.value;
    if (!attrName || attrValue === undefined || attrValue === null) {
      continue;
    }
    formValues[attrName] = attrValue
  }
  return formValues;
}

export default getSubmitValues;