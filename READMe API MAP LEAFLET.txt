READMe API MAP LEAFLET

versión 1.9.4

La clase central de la API: se utiliza para crear un mapa en una página y manipularlo.

Se empieza con vincular los siguientes links en el <head> del HTML

<link rel="stylesheet" href="mimapa.css"> link para hacer el llamado desde la hoja de  los estilos CSS, sin embargo estos estilos pueden ir en el head con el elemento padre <style></style>
    

Se integra el CDN en el <head> para hacer el llamado de la librería, mediante el siguiente link:

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />

Es necesario realizarlo desde este punto para que los elementos del CSS funcionen si se trabajó en una hoja de estilos.
============================================================================================================================================================================================

En el body crear un <div> como el siguiente para integrar el mapa:

<div id="mi_Mapa"></div>

Hacer el llamado del script mediante el siguiente link, para recargar los recursos:

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

============================================================================================================================================================================================
Para definir el mapa se usa el siguiente código: 
let map = L.map('mi_mapa').setView([15.507569742294933, -91.60145049202771], 12)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

donde las coordenadas que se integran son las que saldrán por defecto al abrir el mapa y el número en este caso "12" es zoom predeterminado en la que se abrirá la aplicación del mapa.
===========================================================================================================================================================================================
Para insertar más puntos de referencia se usa el siguiente código:

L.marker([15.507569742294933, -91.60145049202771]).addTo(map).bindPopup('Museo Balam').openPopup()

donde las coordenadas corresponden al lugar en específico que aparecerá en el mapa y se le puede otorgar un nombre dentro de los paréntesis en este caso Museo Balam, sin embargo se puede usar o nombrar el lugar y describirlo en este apartado, se puede copiar tantas veces según sean los sitios que se quieren mostrar en el mapa insertando las coordenadas y el nombre de estos sitios respectivamente.

Si lo que se desea es saber la coordenada de algún punto o sitio y no lo sabemos, se usa el siguiente código que mediante un evento permite que al hacer click en algún punto determinado del mapa este nos dará las coordenadas de sitio para luego insertarlas en el código y hacer que aparezcan en el mapa o simplemente copiarlas para referencias de geolocalización.

<script>
        let map = L.map('mi_mapa').setView([15.507569742294933, -91.60145049202771], 12)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([15.507569742294933, -91.60145049202771]).addTo(map).bindPopup('Museo Balam').openPopup()
        L.marker([15.50932772379888, -91.54958725125013]).addTo(map).bindPopup('Laguna Seca de Ordóñez').openPopup()

        map.on('click', onMapClick)

        function onMapClick(e) {
            alert("Posición:" + e.latlng)
        }
    </script>
===========================================================================================================================================================================================
El código queda de la siguiente manera:

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mapa Leaft</title>
    <link rel="stylesheet" href="mimapa.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />

</head>

<body>
    <div id="mi_mapa"></div>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
   

    <script>
        let map = L.map('mi_mapa').setView([15.507569742294933, -91.60145049202771], 12)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([15.507569742294933, -91.60145049202771]).addTo(map).bindPopup('Museo Balam').openPopup()
        L.marker([15.50932772379888, -91.54958725125013]).addTo(map).bindPopup('Laguna Seca de Ordóñez').openPopup()

        map.on('click', onMapClick)

        function onMapClick(e) {
            alert("Posición:" + e.latlng)
        }
    </script>


</body>

</html>

Hasta este punto es posible que sólo aparezca un cuadro en blanco o simplemente un mapa por lo que en la hoja de estilos CSS se le pueden dar las siguientes características y tenga un mejor diseño para el usuario.

#mi_mapa {
    height: 450px;
    width: 900px;
    display: block;
    margin-top: 20px;
    margin: 20px auto;
}













 



