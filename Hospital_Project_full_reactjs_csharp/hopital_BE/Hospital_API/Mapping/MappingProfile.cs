using AutoMapper;
using Hospital_API.DTOs;
using Hospital_API.Models;

namespace Hospital_API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Blog, BlogDTO>()
                .ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.Author.Username))
                .ReverseMap();
            CreateMap<BlogCreateDTO, Blog>();
            CreateMap<BlogUpdateDTO, Blog>();
        }
    }
} 