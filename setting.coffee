METHOD = ['global', 'all', 'set', 'delete', 'find']

setting = (obj, self) ->
  for name in METHOD
    
    obj[name]._init   = self[name]._init
    obj[name]._finish = self[name]._finish

    obj[name].init   = self[name].init
    obj[name].finish = self[name].finish

  return obj

module.exports = setting
