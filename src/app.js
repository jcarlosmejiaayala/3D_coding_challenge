/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["object"] }] */
import {
  Color,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Box3
} from 'three'

import { MTLLoader } from 'three/examples/js/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/js/loaders/OBJLoader'
import { OrbitControls } from 'three/examples/js/controls/OrbitControls'

const scene = new Scene()

const camera = new PerspectiveCamera(
  1,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.x = -300
camera.position.z = 250

const renderer = new WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.enableZoom = true

const keyLight = new DirectionalLight(new Color('hsl(30, 100%, 75%)'), 1.0)
keyLight.position.set(-100, 0, 100)

const fillLight = new DirectionalLight(new Color('hsl(240, 100%, 75%)'), 0.75)
fillLight.position.set(100, 0, 100)

const backLight = new DirectionalLight(0xffffff, 1.0)
backLight.position.set(100, 0, -100).normalize()

scene.add(keyLight)
scene.add(fillLight)
scene.add(backLight)

const mtlLoader = new MTLLoader()
mtlLoader.setTexturePath('/src/assets/')
mtlLoader.setPath('/src/assets/')
mtlLoader.load('baseball_bat.mtl', materials => {
  materials.preload()

  const objLoader = new OBJLoader()
  objLoader.setMaterials(materials)
  objLoader.setPath('/src/assets/')
  objLoader.load('baseball_bat.obj', object => {
    const box = new Box3().setFromObject(object)
    const boundingBoxSize = box.max.sub(box.min)
    const height = boundingBoxSize.y

    scene.add(object)
    object.position.y = -height / 2
  })
})

const animate = () => {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

animate()
