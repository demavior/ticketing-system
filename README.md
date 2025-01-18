# Ticketing System

This project is a multi-tenant ticketing system built with Django for the backend and React for the frontend.

## Table of Contents
- Overview
- Features
- Tech Stack
- How It Works
  - Roles
  - Multi-Tenancy
<!-- - Getting Started
  - Prerequisites
  - Installation
  - Usage
- License
- Contact -->

## Overview
The Ticketing System is designed to streamline the process of managing support tickets for multiple tenants. Each tenant can have its own set of users, tickets, and configurations.

## Features
- Multi-tenant support (workplace)
- Role-based access control (Admin, Agentm Supervisor, Client)
- User authentication and management
- Ticket creation, assignment, and status updates
- File uploads for tickets
<!-- - Reporting and visualization features 
- Knowledge base section
- Background tasks with Celery (if needed) -->

## Tech Stack
- **Backend:** Django, Django REST Framework
- **Frontend:** React, JavaScript <!-- - **Database:** PostgreSQL -->
- **Authentication:** Django token authentication system
<!-- - **Task Queue:** Celery (optional)
- **Visualization:** Pandas, Plotly -->

## How It Works

### Roles
The system supports different user roles to manage access and permissions:
- **Admin:** Has full access to all features and settings.
- **Agent:** Can see all the tickets assigned from every workplace he has access and update them.
- **Supervisor:** Can manage tickets and users within their workplace.
- **Client:** Can create and view their own tickets.

### Multi-Tenancy
The multi-tenant architecture allows multiple workplaces to use the system with data isolation. Each workplace's data is separated, ensuring privacy and security. The workplace selection is handled during the login process, and middleware ensures that queries are filtered based on the workplace.
