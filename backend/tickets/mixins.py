from django.core.exceptions import ValidationError

class SequenceNumberMixin:
    def generate_sequence_number(self, parent_field):
        if not hasattr(self, parent_field):
            raise ValidationError(f"{parent_field} attribute must be set on the model instance")
        
        filter_kwargs = {parent_field: getattr(self, parent_field)}
        last_instance = self.__class__.objects.filter(**filter_kwargs).order_by('number').last()
        if last_instance:
            return last_instance.number + 1
        return 1