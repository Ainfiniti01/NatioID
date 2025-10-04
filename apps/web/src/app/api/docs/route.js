// OpenAPI Documentation Endpoint
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    // Read OpenAPI spec file
    const apiSpecPath = path.join(process.cwd(), 'apps/web/src/app/api/docs/openapi.yaml');
    
    // For now, return inline OpenAPI spec since file reading might not work
    const openApiSpec = {
      openapi: '3.0.3',
      info: {
        title: 'NatioID API',
        description: 'National Digital Identity Platform API for citizen services, admin operations, and super admin oversight.',
        version: '1.0.0',
        contact: {
          name: 'NatioID API Support',
          email: 'api-support@natioid.gov.ng'
        }
      },
      servers: [
        {
          url: 'https://api.natioid.gov.ng/v1',
          description: 'Production server'
        },
        {
          url: 'https://staging-api.natioid.gov.ng/v1',
          description: 'Staging server'
        },
        {
          url: 'http://localhost:3000/api/v1',
          description: 'Development server'
        }
      ],
      paths: {
        '/auth/permissions': {
          get: {
            summary: 'Get admin permissions',
            description: 'Retrieve current admin\'s role and permissions for UI rendering',
            tags: ['Authentication'],
            security: [{ BearerAuth: [] }],
            responses: {
              '200': {
                description: 'Permissions retrieved successfully',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/PermissionsResponse'
                    }
                  }
                }
              },
              '401': {
                $ref: '#/components/responses/Unauthorized'
              }
            }
          }
        },
        '/applications': {
          get: {
            summary: 'List applications',
            description: 'Retrieve applications with filtering, pagination, and role-based access',
            tags: ['Applications'],
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: 'page',
                in: 'query',
                schema: {
                  type: 'integer',
                  minimum: 1,
                  default: 1
                }
              },
              {
                name: 'limit',
                in: 'query',
                schema: {
                  type: 'integer',
                  minimum: 1,
                  maximum: 100,
                  default: 20
                }
              },
              {
                name: 'status',
                in: 'query',
                schema: {
                  type: 'string',
                  enum: ['pending', 'approved', 'rejected', 'under_review']
                }
              },
              {
                name: 'type',
                in: 'query',
                schema: {
                  type: 'string',
                  enum: ['National ID', 'Driver License', 'Passport', 'Voter Card', 'Health Insurance']
                }
              }
            ],
            responses: {
              '200': {
                description: 'Applications retrieved successfully'
              },
              '401': {
                $ref: '#/components/responses/Unauthorized'
              },
              '403': {
                $ref: '#/components/responses/Forbidden'
              }
            }
          },
          post: {
            summary: 'Create application',
            description: 'Submit new ID application (citizen-facing)',
            tags: ['Applications'],
            security: [{ BearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CreateApplicationRequest'
                  }
                }
              }
            },
            responses: {
              '201': {
                description: 'Application created successfully'
              },
              '400': {
                $ref: '#/components/responses/ValidationError'
              }
            }
          }
        },
        '/applications/{id}/status': {
          patch: {
            summary: 'Update application status',
            description: 'Update application status with admin notes (admin-only)',
            tags: ['Applications'],
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                schema: {
                  type: 'integer'
                }
              },
              {
                name: 'X-Idempotency-Key',
                in: 'header',
                schema: {
                  type: 'string',
                  maxLength: 255
                }
              }
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UpdateStatusRequest'
                  }
                }
              }
            },
            responses: {
              '200': {
                description: 'Status updated successfully'
              },
              '400': {
                $ref: '#/components/responses/ValidationError'
              },
              '403': {
                $ref: '#/components/responses/Forbidden'
              }
            }
          }
        }
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        },
        schemas: {
          BaseResponse: {
            type: 'object',
            required: ['success'],
            properties: {
              success: {
                type: 'boolean'
              },
              error: {
                $ref: '#/components/schemas/ApiError'
              }
            }
          },
          ApiError: {
            type: 'object',
            required: ['code', 'message'],
            properties: {
              code: {
                type: 'string',
                enum: ['UNAUTHORIZED', 'FORBIDDEN', 'NOT_FOUND', 'VALIDATION_ERROR', 'INTERNAL_ERROR']
              },
              message: {
                type: 'string'
              }
            }
          },
          Application: {
            type: 'object',
            required: ['id', 'application_id', 'user_id', 'application_type', 'status', 'submitted_data'],
            properties: {
              id: {
                type: 'integer'
              },
              application_id: {
                type: 'string',
                pattern: '^APP-\\d{4}-\\d{6}$'
              },
              user_id: {
                type: 'integer'
              },
              application_type: {
                type: 'string',
                enum: ['National ID', 'Driver License', 'Passport', 'Voter Card', 'Health Insurance']
              },
              status: {
                type: 'string',
                enum: ['pending', 'approved', 'rejected', 'under_review']
              },
              submitted_data: {
                type: 'object',
                properties: {
                  fullName: {
                    type: 'string',
                    maxLength: 255
                  },
                  dateOfBirth: {
                    type: 'string',
                    format: 'date'
                  },
                  address: {
                    type: 'string',
                    maxLength: 500
                  },
                  phone: {
                    type: 'string',
                    pattern: '^\\+234\\d{10}$'
                  },
                  email: {
                    type: 'string',
                    format: 'email'
                  }
                }
              },
              admin_notes: {
                type: 'string',
                nullable: true,
                maxLength: 1000
              },
              created_at: {
                type: 'string',
                format: 'date-time'
              },
              updated_at: {
                type: 'string',
                format: 'date-time'
              }
            }
          },
          CreateApplicationRequest: {
            type: 'object',
            required: ['user_id', 'application_type', 'submitted_data'],
            properties: {
              user_id: {
                type: 'integer'
              },
              application_type: {
                type: 'string',
                enum: ['National ID', 'Driver License', 'Passport', 'Voter Card', 'Health Insurance']
              },
              submitted_data: {
                type: 'object',
                required: ['fullName', 'dateOfBirth', 'address', 'phone', 'email'],
                properties: {
                  fullName: {
                    type: 'string',
                    maxLength: 255
                  },
                  dateOfBirth: {
                    type: 'string',
                    format: 'date'
                  },
                  address: {
                    type: 'string',
                    maxLength: 500
                  },
                  phone: {
                    type: 'string',
                    pattern: '^\\+234\\d{10}$'
                  },
                  email: {
                    type: 'string',
                    format: 'email'
                  }
                }
              }
            }
          },
          UpdateStatusRequest: {
            type: 'object',
            required: ['status'],
            properties: {
              status: {
                type: 'string',
                enum: ['approved', 'rejected', 'under_review']
              },
              admin_notes: {
                type: 'string',
                maxLength: 1000
              }
            }
          },
          PermissionsResponse: {
            allOf: [
              { $ref: '#/components/schemas/BaseResponse' },
              {
                type: 'object',
                properties: {
                  data: {
                    type: 'object',
                    required: ['admin', 'permissions'],
                    properties: {
                      admin: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string'
                          },
                          name: {
                            type: 'string'
                          },
                          email: {
                            type: 'string',
                            format: 'email'
                          },
                          role: {
                            type: 'string',
                            enum: ['SuperAdmin', 'Admin', 'Reviewer', 'Viewer']
                          },
                          department: {
                            type: 'string'
                          }
                        }
                      },
                      permissions: {
                        type: 'array',
                        items: {
                          type: 'string'
                        }
                      }
                    }
                  }
                }
              }
            ]
          }
        },
        responses: {
          Unauthorized: {
            description: 'Authentication required',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/BaseResponse' },
                    {
                      type: 'object',
                      properties: {
                        success: {
                          type: 'boolean',
                          enum: [false]
                        },
                        error: {
                          $ref: '#/components/schemas/ApiError'
                        }
                      }
                    }
                  ]
                },
                example: {
                  success: false,
                  error: {
                    code: 'UNAUTHORIZED',
                    message: 'Missing or invalid authorization token'
                  }
                }
              }
            }
          },
          Forbidden: {
            description: 'Insufficient permissions',
            content: {
              'application/json': {
                example: {
                  success: false,
                  error: {
                    code: 'FORBIDDEN',
                    message: 'Insufficient permissions. Required: applications.approve'
                  }
                }
              }
            }
          },
          ValidationError: {
            description: 'Invalid request data',
            content: {
              'application/json': {
                example: {
                  success: false,
                  error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Missing required field: user_id'
                  }
                }
              }
            }
          }
        }
      },
      tags: [
        {
          name: 'Authentication',
          description: 'Authentication and authorization endpoints'
        },
        {
          name: 'Applications',
          description: 'ID application management'
        },
        {
          name: 'Users',
          description: 'User management (admin-only)'
        },
        {
          name: 'Voting',
          description: 'Election and voting endpoints'
        }
      ]
    };

    // Check for format parameter
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');

    if (format === 'json') {
      return Response.json(openApiSpec);
    }

    // Return Swagger UI HTML
    const swaggerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NatioID API Documentation</title>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.10.5/swagger-ui.css" />
    <style>
        html {
            box-sizing: border-box;
            overflow: -moz-scrollbars-vertical;
            overflow-y: scroll;
        }
        *, *:before, *:after {
            box-sizing: inherit;
        }
        body {
            margin:0;
            background: #fafafa;
        }
        .swagger-ui .topbar {
            background-color: #004040;
        }
        .swagger-ui .topbar .download-url-wrapper input[type=text] {
            border: 2px solid #004040;
        }
        .swagger-ui .topbar .download-url-wrapper .download-url-button {
            background: #ECBE07;
            color: #004040;
        }
    </style>
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.10.5/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist@5.10.5/swagger-ui-standalone-preset.js"></script>
    <script>
        window.onload = function() {
            const ui = SwaggerUIBundle({
                url: '/api/docs?format=json',
                dom_id: '#swagger-ui',
                deepLinking: true,
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIStandalonePreset
                ],
                plugins: [
                    SwaggerUIBundle.plugins.DownloadUrl
                ],
                layout: "StandaloneLayout",
                defaultModelsExpandDepth: 1,
                defaultModelExpandDepth: 1,
                docExpansion: 'list',
                tryItOutEnabled: true,
                filter: true,
                supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
                onComplete: function() {
                    console.log('Swagger UI loaded');
                },
                requestInterceptor: function(request) {
                    // Add auth token to requests in Swagger UI
                    const token = localStorage.getItem('admin_token');
                    if (token) {
                        request.headers['Authorization'] = 'Bearer ' + token;
                    }
                    return request;
                }
            });
            
            // Add custom styling
            setTimeout(() => {
                const style = document.createElement('style');
                style.textContent = \`
                    .swagger-ui .info .title {
                        color: #004040;
                    }
                    .swagger-ui .scheme-container {
                        background: #004040;
                        color: white;
                        padding: 10px;
                        border-radius: 4px;
                        margin-bottom: 20px;
                    }
                    .swagger-ui .scheme-container .schemes-title {
                        color: #ECBE07;
                    }
                \`;
                document.head.appendChild(style);
            }, 100);
        };
    </script>
</body>
</html>
    `;

    return new Response(swaggerHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    });

  } catch (error) {
    console.error('Error serving API docs:', error);
    return Response.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to load API documentation'
      }
    }, { status: 500 });
  }
}
