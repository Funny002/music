export default function () {

  const filters: { [key: string]: Function } = {};

  const models = import.meta.glob('./*.ts');

  return new Promise((resolve, reject) => {
    try {
      (async function () {
        for (let keyPath in models) {
          const model = await models[keyPath]();
          Object.keys(model).forEach(keys => {
            filters[keys] = model[keys];
          });
        }
        resolve(filters);
      })();
    } catch (e) {
      reject(e);
    }
  });
}
