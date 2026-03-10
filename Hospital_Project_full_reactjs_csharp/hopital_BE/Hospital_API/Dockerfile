FROM mcr.microsoft.com/dotnet/sdk:9.0 as build

WORKDIR /build

COPY  . .

RUN dotnet publish -o ./publish

#############

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS deploy

WORKDIR /app

COPY --from=build /build/publish .

EXPOSE 8080

CMD ["dotnet", "Hospital_API.dll"] 

# docker rm -f cons-dotnet && docker rmi img-dotnet
# docker build . -t img-dotnet

# docker run -d -p 8080:8080 --name cons-dotnet img-dotnet