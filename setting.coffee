METHOD = ['global', 'all', 'set', 'delete', 'find']

setting = (obj, self) ->
  for name in METHOD
    
    obj[name]._before = self[name]._before
    obj[name]._after  = self[name]._after

    obj[name].before = self[name].before
    obj[name].after  = self[name].after

  return obj

module.exports = setting
