
try:
    from south.modelsinspector import add_introspection_rules
    add_introspection_rules([], ["^fontawesome5\.fields\.IconField"])
except ImportError:
    pass