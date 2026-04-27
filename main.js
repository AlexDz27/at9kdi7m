/** YMAPS **/
if (document.getElementById('map')) main()
async function main() {
  await ymaps3.ready;

  const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapControls} = ymaps3;

  const controls = new YMapControls({position: 'bottom left'});
  const {YMapOpenMapsButton} = await ymaps3.import('@yandex/ymaps3-controls-extra');
  const openMapsButton = new YMapOpenMapsButton({});
  controls.addChild(openMapsButton);
  
  // Иницилиазируем карту
    const map = new YMap(
        // Передаём ссылку на HTMLElement контейнера
        document.getElementById('map'),

        // Передаём параметры инициализации карты
        {
            location: {
                // Координаты центра карты
                center: [24.367566, 52.221675],

                // Уровень масштабирования
                zoom: 16
            }
        }
    );

    // Добавляем слой для отображения схематической карты
    map.addChild(new YMapDefaultSchemeLayer());

    // Добавьте слой для маркеров
    map.addChild(new YMapDefaultFeaturesLayer());

    // Создайте DOM-элемент для содержимого маркера.
    // Важно это сделать до инициализации маркера!
    // Элемент можно создавать пустым. Добавить HTML-разметку внутрь можно после инициализации маркера.
    const content = document.createElement('section');

    // Инициализируйте маркер
    const marker = new YMapMarker(
      {
        coordinates: [24.367566, 52.221675],
      },
      content
    );
    map.addChild(marker);
    content.innerHTML = `
      <section class="pin">
        <img class="pin" src="img/pin-ymap.svg" style="position: relative; top: -63.5px; left: -28px;">
      </section>
    `;

    document.querySelector('ymaps').style = 'border-radius: 30px;'

    map.addChild(controls);
    document.querySelector('ymaps').querySelector('.ymaps3x0--controls_bottom').style.zIndex = 1
    document.querySelector('ymaps').querySelector('.ymaps3x0--control-button').onclick = () => {
      window.open("https://yandex.by/maps/org/roshma/191733208246/?ll=27.576254%2C53.807521&z=16.6", "_blank")
    }
}