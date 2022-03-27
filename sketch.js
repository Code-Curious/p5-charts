// Global variable to store the gallery object. The gallery object is
// a container for all the visualisations.
var gallery;

function setup() {
  // Create a canvas to fill the content div from index.html.
  canvasContainer = select('#app');
  var c = createCanvas(1024, 700);
  c.parent('app');

  // Create a new gallery object.
  gallery = new Gallery();

  // Add the visualisation objects here.
  gallery.addVisual(new TechDiversityRace());
  gallery.addVisual(new TechDiversityGender());
  gallery.addVisual(new PayGapTimeSeries());
  gallery.addVisual(new Worldpopulation());
  gallery.addVisual(new Socialmedia());
  gallery.addVisual(new Vaccine());

}

function draw() {
  background(255);
  frameRate(60); //60 frames to be displayed every second.
  if (gallery.selectedVisual != null) {
    gallery.selectedVisual.draw();
  }
}
