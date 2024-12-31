from django.utils.deprecation import MiddlewareMixin
from .models import Tenant

class TenantMiddleware(MiddlewareMixin):
    def process_request(self, request):
        tenant_id = request.headers.get('X-Tenant-ID')
        if tenant_id:
            try:
                request.tenant = Tenant.objects.get(id=tenant_id)
            except Tenant.DoesNotExist:
                request.tenant = None
        else:
            domain = request.get_host().split(':')[0]
            try:
                request.tenant = Tenant.objects.get(domain=domain)
            except Tenant.DoesNotExist:
                request.tenant = None