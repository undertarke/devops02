using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Linq;
using System.Collections.Generic;

namespace Hospital_API.Filters
{
    public class SwaggerFileOperationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            var formFileParams = context.ApiDescription.ActionDescriptor.Parameters
                .Where(p => p.ParameterType == typeof(IFormFile))
                .ToList();

            if (formFileParams.Any())
            {
                operation.RequestBody = new OpenApiRequestBody
                {
                    Content = new Dictionary<string, OpenApiMediaType>
                    {
                        ["multipart/form-data"] = new OpenApiMediaType
                        {
                            Schema = new OpenApiSchema
                            {
                                Type = "object",
                                Properties = formFileParams.ToDictionary(
                                    p => p.Name,
                                    p => new OpenApiSchema
                                    {
                                        Type = "string",
                                        Format = "binary"
                                    }
                                ),
                                Required = new HashSet<string>(formFileParams.Select(p => p.Name))
                            }
                        }
                    }
                };
            }
        }
    }
} 