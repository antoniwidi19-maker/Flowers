// Inisialisasi Scene Three.js untuk Animasi 3D Objek Bunga Abstrak
const container = document.getElementById('canvas-container');

// 1. Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// 2. Tambahkan Pencahayaan (Lighting)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff4757, 2, 50);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// 3. Buat Objek 3D (Simulasi Kelopak/Pusat Bunga Menggunakan Torus Knot / Geometri Unik)
const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
const material = new THREE.MeshStandardMaterial({ 
    color: 0xff6b81, 
    roughness: 0.3,
    metalness: 0.2 
});
const flower3D = new THREE.Mesh(geometry, material);
scene.add(flower3D);

camera.position.z = 4;

// 4. Interaksi Mouse/Touch untuk Memutar Objek
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

container.addEventListener('mousedown', (e) => {
    isDragging = true;
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    flower3D.rotation.y += deltaX * 0.01;
    flower3D.rotation.x += deltaY * 0.01;

    previousMousePosition = { x: e.clientX, y: e.clientY };
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

// Touch support untuk HP/Tablet
container.addEventListener('touchstart', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
});

window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.y;

    flower3D.rotation.y += deltaX * 0.01;
    flower3D.rotation.x += deltaY * 0.01;

    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
});

window.addEventListener('touchend', () => {
    isDragging = false;
});

// Simpan posisi awal mouse
window.addEventListener('mousedown', (e) => {
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

// 5. Animasi Loop (Render & Rotasi Otomatis)
function animate() {
    requestAnimationFrame(animate);

    // Rotasi pelan jika tidak sedang digeser
    if (!isDragging) {
        flower3D.rotation.x += 0.005;
        flower3D.rotation.y += 0.008;
    }

    renderer.render(scene, camera);
}

animate();

// Responsif saat ukuran jendela berubah
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
