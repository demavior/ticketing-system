from django import forms
from .models import Ticket, Category

class TicketAdminForm(forms.ModelForm):
    class Meta:
        model = Ticket
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.tenant:
            self.fields['category'].queryset = Category.objects.filter(tenant=self.instance.tenant)
