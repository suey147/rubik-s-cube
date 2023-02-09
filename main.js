import * as THREE from 'https://cdn.skypack.dev/three@0.130.1';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.130.1/examples/jsm/controls/OrbitControls.js';
import RubiksCube from './lib/Rubikscube.js';
import { RectAreaLightUniformsLib } from 'https://cdn.skypack.dev/three@0.130.1/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from 'https://cdn.skypack.dev/three@0.130.1/examples/jsm/helpers/RectAreaLightHelper.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 36, window.innerWidth / window.innerHeight, 1, 1000 );
const canvas = document.querySelector('canvas.webgl');

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const renderer = new THREE.WebGLRenderer({canvas: canvas})
const controls = new OrbitControls( camera, renderer.domElement );

var light = new THREE.PointLight(0xffffff);
light.position.set(0,0,0);
scene.add(light);
console.log(scene)
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

document.body.appendChild( renderer.domElement );
renderer.setSize( sizes.width, sizes.height);


camera.position.z = 5;
camera.position.y = 5;
camera.position.x = 5;



const cube = new RubiksCube();
scene.add(cube.rubiksCubeGroup);
//scene.add(cube.outline)
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let selectedCube = null;
function onMouseDown(event){
    event.preventDefault();
    mouse.x = (event.clientX/sizes.width)*2-1;
    mouse.y = -(event.clientY/sizes.height)*2+1;
    //find intersection
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children[1].children);
    if (intersects.length>0) {

        selectedCube = intersects[0].object;
        cube.highlightCubes(intersects[0].object);
        

    }
    
}



const onKeyDown = (event) =>{
    if (event.repeat) {
        return;
      }
      cube.onKeyDown(event);
}



const animate = function () {
    
    requestAnimationFrame( animate );

    render();
    controls.update();
};

function render(){
    
    renderer.render( scene, camera );
}

// const axesHelper = new THREE.AxesHelper( 20 );
// scene.add( axesHelper );

window.addEventListener('mousedown',onMouseDown);

window.addEventListener('keydown', onKeyDown);
window.requestAnimationFrame(animate);
