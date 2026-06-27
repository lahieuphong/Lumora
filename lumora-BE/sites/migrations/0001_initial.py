import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='SiteSetup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('site_name', models.CharField(blank=True, default='Enter site name', max_length=160)),
                ('site_type', models.CharField(choices=[('Website', 'Website'), ('Landing Page', 'Landing Page'), ('Event Page', 'Event Page')], default='Website', max_length=40)),
                ('domain', models.CharField(blank=True, default='my-site.acme.com', max_length=255)),
                ('starting_point', models.CharField(choices=[('Template', 'Template'), ('AI', 'AI'), ('Blank', 'Blank')], default='Template', max_length=40)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('owner', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='site_setup', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Site setup',
                'verbose_name_plural': 'Site setups',
            },
        ),
    ]
