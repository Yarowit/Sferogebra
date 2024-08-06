// Dodaje sprite'y liczb na sferze - serwer!
const textMark = false;
//// CONST BAY
const LatLines = 18, LongLines = 18;
const unitVector = new THREE.Vector3(0,0,1);
const scene = new THREE.Scene();

const radius = 1, pointRadius = radius/60, sphSegment = 200, pointSegment = 200,Segment = 200;
let Sphere;
let objectArray = [];
let raycaster = new THREE.Raycaster();
raycaster.params.Line.threshold = 0.01;
let mouse = new THREE.Vector2();

//Usables:
let currentObject;

function start()
{
	container = document.querySelector('#scene-container');

	
	scene.background = new THREE.Color('#303030');
	
	CrCamera();
	CrControls();
	CrLights();
	CrSphere();
	CrMesh();
	CrRenderer();
	if(textMark) allText();
	
	renderer.setAnimationLoop(()=>{
		update();
		render();
	} );
}

function CrCamera()
{
	const fov = 35;
	const aspect = container.clientWidth / container.clientHeight;
	const near = 0.1;
	const far = 100;

	camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
	camera.position.set(0, 0, 5);
	camera.lookAt(scene.position);
}

function CrControls()
{
	controls = new THREE.OrbitControls(camera,container);
	controls.enablePan = false;
	controls.minDistance = 2;
	controls.maxDistance = 7;
	controls.update();
}
function CrLights()
{
	let light = new THREE.DirectionalLight(0x555555, 5.0);
	light.position.set(4,4,4);
	scene.add(light);
	
	light = new THREE.DirectionalLight(0x555555, 5.0);
	light.position.set(-4,-4,-4);
	scene.add(light);
}
function CrSphere()
{	
	const geometry = new THREE.SphereBufferGeometry(radius,sphSegment, sphSegment);
	
	const material = new THREE.MeshStandardMaterial({
		color: 0x404040,
		opacity: 0.7,
		transparent: true,
		//name: 'Sphere'
		});
		
	Sphere = new THREE.Mesh(geometry, material);
	
	scene.add(Sphere);
	
	objectArray.push(Sphere);
}
function CrMesh()
{
    for (let k = 0; k<LatLines; k++)
	{
		currentObject = new GCircle(new THREE.Vector3(0,1,0), new THREE.Vector3(1,0,0));
		currentObject.rotation.y = k*Math.PI /LatLines ;
		//CrDependancy(currentObject.id);
		
		//objectArray.push(currentObject);
		scene.add(currentObject);
		//currentObject.name = 'great';
		currentObject.material.opacity =  0.4;
		currentObject.material.transparent =  true;
	}

    for (let k = 1; k< LongLines; k++)
	{
		const A = Math.PI*k/LongLines;
		const r = Math.sin(A);
		const l = Math.cos(A);
		//const qw = new THREE.Quaternion().setFromUnitVectors(unitVector, new THREE.Vector3(0,1,0));
		

		currentObject = new Circle(new THREE.Vector3(0,1,0), new THREE.Vector3(0,l,r));
		
		//CrDependancy(currentObject.id);
		
		//objectArray.push(currentObject);
		scene.add(currentObject);
		//currentObject.name = 'normal';
		
		// currentObject.material.color.setHex(0xdddddd);
		currentObject.material.opacity =  0.6;
		currentObject.material.transparent =  true;
	}
}

function CrRenderer()
{
	renderer = new THREE.WebGLRenderer({ antialias: true});
	renderer.setSize( container.clientWidth , container.clientHeight);
	renderer.setPixelRatio(window.devicePixelRatio);

	container.appendChild(renderer.domElement);
}

function winResize ()
{
	camera.aspect = container.clientWidth / container.clientHeight;
	
	camera.updateProjectionMatrix();
	
	renderer.setSize( container.clientWidth, container.clientHeight );

	//document.getElementById("doscrolla")
	
	//scroll
	//document.getElementById("doscrolla").style.height = 100vhvw';
	//document.getElementById("doscrolla").style.height = (visualViewport.height - visualViewport.width*16/100).toString()+'px';
}
let radTable = [], degTable = [];
function allText()
{
	
	const loader = new THREE.TextureLoader();

	//Theta pi
	for(let i = 1; i < 12; i++)
	{	
		if(i!==6)
		{
			const spriteMap = loader.load("img/liczby/"+i+".png");

			const spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } );
			const sprite = new THREE.Sprite( spriteMaterial );
			scene.add( sprite );

			const p = new THREE.Vector3().setFromSphericalCoords(1.03,Math.PI/2,Math.PI*i/6);
			
			sprite.position.set(p.x,p.y,p.z);
			sprite.scale.set(0.1, 0.1, 0.1);
			sprite.visible = false;

			radTable.push(sprite);
		}
	}

	//Phi pi
	for(let i = 0; i < 7; i++)
	{
		if(i!==3)
		{
			const spriteMap = loader.load("img/liczby/"+i+".png");

			const spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } );
			const sprite = new THREE.Sprite( spriteMaterial );
			const sprite2 = new THREE.Sprite( spriteMaterial );
			scene.add( sprite );
			scene.add( sprite2 );

			const p = new THREE.Vector3().setFromSphericalCoords(1.04,Math.PI*i/6, 0);
			
			const p2 = new THREE.Vector3().setFromSphericalCoords(1.04,Math.PI*i/6, Math.PI);

			sprite.position.set(p.x,p.y,p.z);
			sprite.scale.set(0.1, 0.1, 0.1);
			
			sprite2.position.set(p2.x,p2.y,p2.z);
			sprite2.scale.set(0.1, 0.1, 0.1);
			
			sprite.visible = false;
			sprite2.visible = false;

			radTable.push(sprite);
			radTable.push(sprite2);
		}
	}

	//Theta deg
	for(let i = 1; i < 12; i++)
	{	
		if(i!==6)
		{
			const spriteMap = loader.load("img/stopnie/"+i+".png");

			const spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } );
			const sprite = new THREE.Sprite( spriteMaterial );
			scene.add( sprite );

			const p = new THREE.Vector3().setFromSphericalCoords(1.04,Math.PI/2,Math.PI*i/6);
			
			sprite.position.set(p.x,p.y,p.z);
			sprite.scale.set(0.1, 0.1, 0.1);
			
			degTable.push(sprite);
		}
	}

	//Phi deg
	for(let i = 0; i < 7; i++)
	{
		if(i!==3)
		{
			const spriteMap = loader.load("img/stopnie/"+i+".png");

			const spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } );
			const sprite = new THREE.Sprite( spriteMaterial );
			const sprite2 = new THREE.Sprite( spriteMaterial );
			scene.add( sprite );
			scene.add( sprite2 );

			const p = new THREE.Vector3().setFromSphericalCoords(1.03,Math.PI*i/6, 0);
			
			const p2 = new THREE.Vector3().setFromSphericalCoords(1.03,Math.PI*i/6, Math.PI);

			sprite.position.set(p.x,p.y,p.z);
			sprite.scale.set(0.1, 0.1, 0.1);
			
			sprite2.position.set(p2.x,p2.y,p2.z);
			sprite2.scale.set(0.1, 0.1, 0.1);
			
			degTable.push(sprite);
			degTable.push(sprite2);
		}
	}
	
	//środki 
	for(let i=0; i<4; i++)
	{
		const spriteMap = loader.load("img/srodki/"+i+".png");

		const spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } );
		const sprite = new THREE.Sprite( spriteMaterial );
		scene.add( sprite );

		let p;
		

		switch(i)
		{
			case 0:
				sprite.scale.set(0.12, 0.11, 0.13);
				p = new THREE.Vector3().setFromSphericalCoords(1.04, Math.PI/2, Math.PI*i);
		
				break;
			case 1:
				sprite.scale.set(0.15, 0.11, 0.13);
				p = new THREE.Vector3().setFromSphericalCoords(1.04, Math.PI/2, Math.PI*i);
		
				break;
			case 2:
				sprite.scale.set(0.13, 0.08, 0.11);
				p = new THREE.Vector3().setFromSphericalCoords(1.05, Math.PI/2, Math.PI*i);
		
				break;
			case 3:
				sprite.scale.set(0.17, 0.08, 0.11); 
				p = new THREE.Vector3().setFromSphericalCoords(1.05, Math.PI/2, Math.PI*i);
		
				break;
		}
		
		sprite.position.set(p.x,p.y,p.z);

		if(i<2)
		{
			radTable.push(sprite);
			sprite.visible = false;
		}else{
			degTable.push(sprite);
			sprite.visible = true;
		}
	}
}

function render()
{
	renderer.render(scene,camera);
}
let oldPos,marked = false;
function update()
{
	raycaster.setFromCamera(mouse, camera);

	intersect = raycaster.intersectObjects( objectArray );
	
	//pointIntersect = raycaster.intersectObjects( pointArray );
	
	if (camera.position.length() !== oldPos)
	{
		controls.rotateSpeed = camera.position.length()*camera.position.length()/45;
		oldPos = camera.position.length();
	}
	//if (marked !== false) console.log(marked);

	
	if (intersect.length > 0){
		
		if(isPointTouched() && mode === 0){
			
			if(act.style.cursor !== 'grab'){
				act.style.cursor = 'grab';
				act.classList.toggle("filler");
				// act.classList.remove("pointer","default");
				// act.classList.add("grab");
				marking()

			}
		}else if(isPointTouched() && ( mode === 2 || mode === 3 || mode === 4 || mode === 6)){
			if (act.style.cursor !== 'pointer'){
				act.style.cursor = 'pointer';
				act.classList.toggle("filler");
				// act.classList.remove("default");
				// act.classList.add("pointer");
				marking();
			}
		}else if(isCircleTouched() && (mode === 1 || mode === 5 || mode === 6)){
			if(act.style.cursor !== 'pointer'){
				act.style.cursor = 'pointer';
				act.classList.toggle("filler");
				// act.classList.remove("default");
				// act.classList.add("pointer");
				console.log("Tooggls");
				marking()
			}
		}else if(act.style.cursor !== 'default'){
			act.style.cursor = 'default';
			act.classList.toggle("filler");
			// act.classList.remove("pointer");
			// act.classList.add("default");
			if (marked !== false) {marked.default();/*console.log("defing", isCircleTouched())*/;}
		marked = false;}
		//if(dragTime)
	}else{
		if (marked !== false){
			marked.default();
			marked = false;
		}
	}
	
}
function marking(){
	if (marked !== intersect[0].object){
		if(marked !== false) marked.default();
		marked = intersect[0].object;
		//console.log("zaznaczam",marked);
		marked.mark();
	}
}
function classChanger()
{	
	if (dragTime){undo(); disposer(true);
		dragTime = false;}
	if(controls.enableRotate === false){
		controls.enableRotate = true;
		controls.enableZoom = true;
		document.getElementById("kolory").style.visibility = "hidden";
	}
	switch (mode)
	{
		case 0:
			document.getElementById("pointer").classList.toggle("tryb");
			document.getElementById("pointer").classList.toggle("trybClick");
			break;
		case 1:
			document.getElementById("point").classList.toggle("tryb");
			document.getElementById("point").classList.toggle("trybClick");
			break;
		case 2:
			document.getElementById("gCircle").classList.toggle("tryb");
			document.getElementById("gCircle").classList.toggle("trybClick");
			break;
		case 3:
			document.getElementById("Circle").classList.toggle("tryb");
			document.getElementById("Circle").classList.toggle("trybClick");
			break;
		case 4:
			document.getElementById("CircleFromCenter").classList.toggle("tryb");
			document.getElementById("CircleFromCenter").classList.toggle("trybClick");
			break;
		case 5:
			document.getElementById("testIntersection").classList.toggle("tryb");
			document.getElementById("testIntersection").classList.toggle("trybClick");
			break;
		case 6:
			document.getElementById("kolorki").classList.toggle("tryb");
			document.getElementById("kolorki").classList.toggle("trybClick");
			break;
		default:
			break;
	}
}
window.addEventListener('resize',winResize);
document.getElementById("pointer").addEventListener('click', ()=>{
	classChanger();
	mode=0; 
	classChanger();
});

document.getElementById("point").addEventListener('click', ()=>{
	classChanger();
	mode=1; 
	console.log("midendD");
	//undo();
	classChanger();
});

document.getElementById("gCircle").addEventListener('click', ()=>{
	classChanger();
	mode=2;
	classChanger();
});

document.getElementById("Circle").addEventListener('click', ()=>{
	classChanger();
	mode=3;
	classChanger();
});

document.getElementById("testIntersection").addEventListener('click', ()=>{
	classChanger();
	mode=5; 
	classChanger();
});

document.getElementById("CircleFromCenter").addEventListener('click', ()=>{
	classChanger();
	mode=4; 
	classChanger();
});

document.getElementById("kolorki").addEventListener('click', ()=>{
	classChanger();
	mode=6;
	classChanger();
});

document.getElementById("cofnij").addEventListener('click', ()=>{
	//if(timeLine[timeLine.length-1].length === 0) timeLine.pop();
	if(timeLine.length > 0)
	undo();
	dragTime = false;
});

document.getElementById("oddaj").addEventListener('click', ()=>{

	if(timeLine.length > 0 && dragTime){
		undo(); 
		disposer(true);
		dragTime = false;
	}
	if(reverseTimeLine.length > 0) returnObjects();
});

class Point extends THREE.Mesh {
    constructor(pos){
        const geometry = new THREE.SphereBufferGeometry(pointRadius,pointSegment,pointSegment);
        const material = new THREE.MeshStandardMaterial({
            color: 0xc4443b,
            //name: "Point"
            });
        super(geometry,material);
		this.kin = [];
        scene.add(this);
		objectArray.push(this);
        this.move(pos);
		this.color = 0xc4443b;
		if(isCircleTouched() && intersect[0].object !== currentObject){
			this.bound = intersect[0].object;
			intersect[0].object.kin.push(this);
		}else{
			this.bound = false;
		}
    }
	/**
	 * @param {vector} pos 
	 */
    move(pos){
        this.position.set(pos.x,pos.y,pos.z);
    }

	moveSph(dek,rek,unitMode){
		let sph;
		console.log(dek,rek);
		const v = (unitMode===0)*(Math.PI/180)+(unitMode===1)*1+(unitMode===2)*Math.PI;
		if(rek === false || dek === false){
			sph = new THREE.Spherical().setFromVector3(this.position);
			if(rek === false || dek === false){
				this.position.setFromSphericalCoords(1, sph.phi, sph.theta);				
			}else{
				if(rek === false){
					this.position.setFromSphericalCoords(1, dek * v, sph.theta);
				}
				if(dek === false){
					this.position.setFromSphericalCoords(1, sph.phi, rek * v);
				}
			}
		}else{
			this.position.setFromSphericalCoords(1, dek * v, rek * v);
		}
		
	}
	
	InterMove(){
		const c1 = this.bound[0];
		const c2 = this.bound[1];
		const border = 1e-3;
		let Rangle,rangle,a;
		const v1 = new THREE.Vector3().copy(unitVector).applyQuaternion(c1.quaternion);
		const v2 = new THREE.Vector3().copy(unitVector).applyQuaternion(c2.quaternion);
		
		if(c1 instanceof GCircle && c2 instanceof GCircle)
		{
			if(this.left){
				this.move(v1.cross(v2).normalize());
			}else{
				this.move(v2.cross(v1).normalize());
			}
		}else{
			
			Rangle = Math.asin(c1.geometry.parameters.radius);
			rangle = Math.asin(c2.geometry.parameters.radius);
			a = v1.angleTo(v2);
			let v = new THREE.Vector3(0,0,0);
		if(a - Rangle - rangle < border) {
			this.visible = true;

			const rotvector = new THREE.Vector3().copy(v1).normalize();
			v.crossVectors(v1,v2);
			v.cross(v1);
			v.setLength(c1.geometry.parameters.radius);

			const gamma = Math.acos( ( Math.cos(rangle) - Math.cos(Rangle) * Math.cos(a) ) / ( Math.sin(Rangle) * Math.sin(a) ) );

			if(this.left){
				v.applyAxisAngle(rotvector, gamma);
			}else{
				v.applyAxisAngle(rotvector, -1*gamma);
			}
			this.move(v.add(c1.position));
		}}		
	}
	/**
	 * zmiana przy ruchu myszką bounda
	 * @param {vector} circle 
	 * @param {vector} cursor 
	 */
	CircleMove(cursor){
		const circle = this.bound;
		const v1 = new THREE.Vector3().copy(unitVector).applyQuaternion(circle.quaternion);
		const v2 = new THREE.Vector3().crossVectors(v1, cursor);
		v2.cross(v1);
		v2.setLength(circle.geometry.parameters.radius);
		v2.add(circle.position);
		this.move(v2);
	}
	/**
	 * zmiana przy zmianie dużego (bez myszki)
	 * @param {vector} circle 
	 */
	CircleResizeMove(){
		const circle = this.bound;
		const v = new THREE.Vector3(0,0,1).applyQuaternion(circle.quaternion);
		const rotv = new THREE.Vector3().crossVectors(v,this.position,);
		this.move(v.applyAxisAngle(rotv.normalize(), Math.asin(circle.geometry.parameters.radius)).normalize());
	}

	default(){
		console.log("kolorek:",this.color);
		this.material.emissive.set(0x000000);
		this.material.color.set(this.color);
	}
	mark(){
		this.material.emissive.set(0xff2222);
	}
}

class GCircle extends THREE.LineLoop {
    constructor(p1,p2){
        const geometry = new THREE.CircleGeometry(radius,Segment);
	    geometry.vertices.shift();
//console.log("Gcpowstaje");
        const material = new THREE.LineBasicMaterial({
            //name: "Circle"
            });
        super(geometry,material);
		this.kin = [];
		scene.add(this);
		objectArray.push(this);
        this.move(p1,p2);
		this.color = 0xffffff;
		//this.bound = [p1,p2];
    }
    
    move(p1,p2){
		//console.log(p1,p2);
        const v1 = new THREE.Vector3().crossVectors(p1, p2).normalize();
	    const qw = new THREE.Quaternion().setFromUnitVectors(unitVector, v1);
        this.quaternion.rotateTowards(qw,2*Math.PI);
    }
	default(){
		this.material.color.set(this.color);
	}
	mark(){
		this.material.color.set(0xff2222);
		//console.log(this.material.color);
	}
}

class Circle extends THREE.LineLoop {
	constructor(p1,p2,p3 = 0){
		//console.log(p3);
		const geometry = new THREE.CircleGeometry( 1e-4 ,Segment);
		geometry.vertices.shift();
		
		const material = new THREE.LineBasicMaterial({
			linewidth: 10,
			//name: "Circle"
			});
			
		super(geometry, material);
		this.kin = [];
		scene.add(this);
		objectArray.push(this);
//console.log(this);
//this.oldr = 1.0;
		this.move(p1,p2,p3);
		this.color = 0xffffff;
		//this.bound = [p1,p2,p3];
		//console.log(this.oldr);
	}

	move(p1,p2,p3 = 0)
	{
		let qw,cAngle,r,v0,pc,pa,pb;
	
		if(p3===0){//center
			pc=p1
		}else{//normal
			pa = new THREE.Vector3().crossVectors(p1,p2);
			pc = new THREE.Vector3().addVectors(p1, p2);
			pa.cross(pc);
			pb = new THREE.Vector3().crossVectors(p1,p3);
			pc = new THREE.Vector3().addVectors(p1, p3);
			pb.cross(pc);
			pc = new THREE.Vector3().crossVectors(pa,pb);
			pc.normalize();
		}
		//console.log("DAta: ",pc,p2);
		qw = new THREE.Quaternion().setFromUnitVectors(unitVector, pc);
		//console.log(p2,pc);
		cAngle = p2.angleTo(pc);
		r = Math.max(Math.sin(cAngle),1e-4);
		v0 = new THREE.Vector3().copy(pc);
		v0.multiplyScalar(Math.cos(cAngle));
		this.geometry.dispose();
		this.geometry = new THREE.CircleGeometry( r ,Segment);
		this.geometry.vertices.shift();
		//if (this.geometry.radius>0.4){console.log("DataK: ",cAngle,r)}
		this.quaternion.rotateTowards(qw,2*Math.PI);
		this.position.set(v0.x,v0.y,v0.z);
		//console.log(this.geometry.parameters.scale);
		//this.oldr = r;
	}

	
	default(){
		
		this.material.color.set(this.color);
	}
	mark(){
		this.material.color.set(0xff2222);
	}
}

function onMouseMove(event)
{
	mouse.x = (event.offsetX / container.clientWidth) * 2 - 1;
	mouse.y = -(event.offsetY / container.clientHeight) * 2 + 1;
	if(dragTime){
		drag();
	}
}
/////!!!!!!!! tu dodać żeby dotykać innych jeśli bez sprzeciwu

function isCircleTouched(){
	if (intersect.length > 0)
	if(intersect[0].object instanceof GCircle || intersect[0].object instanceof Circle)
	if (intersect[0].object !== ob1 && intersect[0].object !== ob2)
		return true;
		return false;
}

function isPointTouched(){
	if (intersect.length > 0)
	if (intersect[0].object instanceof Point)
	if (intersect[0].object !== ob1 && intersect[0].object !== ob2 && intersect[0].object !== ob3)
		return true;
		return false;
}

let mode;
/*
	0. Mysz
	1. Punkt
	2. K wielkie
	3. K małe
	4. K środek
	5. Przecinki
	6. Kolorki
*/

let ob1 =false, ob2 =false, ob3 =false, dragTime = false;

/**
 *  @returns position on sphere*/
function posOnSphere(){
	for(let i=0; i<intersect.length;i++){
		if (!(intersect[i].object instanceof Point)){
			return intersect[i].point;
		} 
	}
}

function moveChildren(parent){
	//console.log(parent.kin);
	for(const child of parent.kin){
		if(child instanceof Point){
			if(child.bound instanceof Array){
				child.InterMove();
			}else{
				child.CircleResizeMove();
			}
		}
		if(child instanceof GCircle){
			child.move(child.bound[0].position,child.bound[1].position);
		}
		if(child instanceof Circle){
			if (child.bound.length === 2)
				child.move(child.bound[0].position,child.bound[1].position);
			else
				child.move(child.bound[0].position,child.bound[1].position,child.bound[2].position);
			}
		moveChildren(child);
	}
}

function dragStart(){
console.log("Dst: ",dragTime);
	if (intersect.length > 0){
		//justDragged = false;
		switch(mode){
			case 0:
				if(isPointTouched())
					currentObject = intersect[0].object;
				else
					dragTime = false;
				break;
			case 1: // Point
				if(!isPointTouched()){
					currentObject = new Point(intersect[0].point);
					timeLine[timeLine.length-1].push(currentObject);
				}break;
			case 2: // Great Circle
				if(isPointTouched()){
					ob1 = intersect[0].object;
				}else{
					ob1 = new Point(intersect[0].point);
					timeLine[timeLine.length-1].push(ob1);
				}
				currentObject = new GCircle(ob1.position, posOnSphere().cross(unitVector).normalize());
				timeLine[timeLine.length-1].push(currentObject);
				
				//dragTime = true;
				break;
			case 4:	// Center Circle
				if(isPointTouched()){
					ob1 = intersect[0].object;
				}else{
					ob1 = new Point(intersect[0].point);
					timeLine[timeLine.length-1].push(ob1);
				}
				currentObject = new Circle(ob1.position, posOnSphere());
				timeLine[timeLine.length-1].push(currentObject);
				
				//dragTime = true;
				break;
			case 5: // Intersect
				if(isCircleTouched()){
					ob1 = intersect[0].object;

				}break;
			case 6:
				const koloryCss = document.getElementById("kolory").style;				
				
				if (intersect[0].object instanceof Point || intersect[0].object instanceof GCircle || intersect[0].object instanceof Circle)
				{
					if(intersect[0].object === currentObject){
						controls.enableRotate = true;
						controls.enableZoom = true;
						koloryCss.visibility = 'hidden';
					}else{
						controls.enableRotate = false;
						controls.enableZoom = false;
		
						const left = (mouse.x + 1)*50;
						const bottom = (mouse.y + 1)*50;
						
						koloryCss.left = left+'%';
						koloryCss.bottom = bottom+'%';

						currentObject = intersect[0].object;
						currentObject.mark();
						
						koloryCss.visibility = 'visible';
					}
				}else{
					controls.enableRotate = true;
					controls.enableZoom = true;
					koloryCss.visibility = 'hidden';
				}
				dragTime = false;
				break;

		}
	}
	console.log(timeLine);
}


function drag(){
	if (intersect.length > 0 && dragTime === true){
		switch(mode){
			case 0:
				if(currentObject.bound === false)
					currentObject.move(posOnSphere());
				else
					currentObject.CircleMove(posOnSphere());
				moveChildren(currentObject);
				break;
			case 2:
			case 4:
				if(isPointTouched()){
					currentObject.move(ob1.position,intersect[0].object.position);
				}else{
					currentObject.move(ob1.position, posOnSphere());
				}break;
			case 3:
				if(isPointTouched()){
					currentObject.move(ob1.position,ob2.position,intersect[0].object.position);
				}else{
					currentObject.move(ob1.position,ob2.position, posOnSphere());
				}break;
		}
	}
}

let justDragged;
function dragEnd(){
//console.log("Dend: ",dragTime);
	if (intersect.length > 0){
		//console.log(mode);
		//justDragged = true;
		switch(mode){
			case 2:
			case 4:
				//console.log("activating");
				if(isPointTouched()){
					ob2 = intersect[0].object;
				}else{
					//console.log(posOnSphere(),"TOtosa");
					ob2 = new Point(posOnSphere());
					timeLine[timeLine.length-1].push(ob2);
				}
				currentObject.move(ob1.position,ob2.position);
				ob1.kin.push(currentObject);
				ob2.kin.push(currentObject);
				currentObject.bound = [ob1,ob2];
				//dragTime = false;
				break;
			case 5:
				if(isCircleTouched()){
					ob2 = intersect[0].object;
					console.log(ob1,ob2);
					currentObject = new Point(unitVector);
					currentObject.bound = [ob1,ob2];
					currentObject.left = true;
					currentObject.InterMove();
					ob1.kin.push(currentObject);
					ob2.kin.push(currentObject);
					timeLine[timeLine.length-1].push(currentObject);

					currentObject = new Point(unitVector);
					currentObject.bound = [ob1,ob2];
					currentObject.left = false;
					currentObject.InterMove();
					ob1.kin.push(currentObject);
					ob2.kin.push(currentObject);
					timeLine[timeLine.length-1].push(currentObject);
				//console.log(currentObject.position);

					//dragTime = false;
				}break;
		}
	}



}

const act = document.getElementById("scene-container");
// act.classList.add('default');
let d,d2;
act.addEventListener('mousemove',onMouseMove);
act.addEventListener('mousedown',(event)=>{
	if(event.which === 1) onClick();});
act.addEventListener('mouseup',()=>{if(event.which === 1 && dragTime && mode !== 3 && mode !== 6) setTimeout(() => {

	intersect = raycaster.intersectObjects( objectArray );
	if (mode === 0){ endFunctionReset(); dragTime = false;}
	if (intersect.length > 0) if(ob1!==intersect[0].object && ob2!==intersect[0].object && ob3!==intersect[0].object){
		console.log("Autobots!");
		dragEnd();
		endFunctionReset();
		dragTime = false;
	}}, 1);});

function onClick(){
	if (intersect.length>0){
		if(mode === 3){
			if (ob1 === false){
				timeLine.push([])
				if (isPointTouched()){
					ob1 = intersect[0].object;
				}else{
					ob1 = new Point(intersect[0].point);
					timeLine[timeLine.length-1].push(ob1);
				}
			}else if(ob2 === false){
				if (isPointTouched()){
					ob2 = intersect[0].object;
				}else{
					ob2 = new Point(intersect[0].point);
					timeLine[timeLine.length-1].push(ob2);
				}
				currentObject = new Circle(ob1.position,ob2.position,posOnSphere());
				timeLine[timeLine.length-1].push(currentObject);
				dragTime = true;
			}else{
				if (isPointTouched()){
					ob3 = intersect[0].object;
				}else{
					ob3 = new Point(intersect[0].point);
					timeLine[timeLine.length-1].push(ob3);
				}
				currentObject.move(ob1.position,ob2.position,ob3.position);
				currentObject.bound = [ob1,ob2,ob3];
				ob1.kin.push(currentObject);
				ob2.kin.push(currentObject);
				ob3.kin.push(currentObject);
				dragTime = false;
				endFunctionReset();
			}
		}else
	
		if(!dragTime){
			dragTime = true;
			if(mode!==6) timeLine.push([])
			dragStart();
			console.log("koniec Onclicka");
		}else{
			dragEnd();
			endFunctionReset();
			dragTime = false;
			console.log("koniec endu z onclicka");
		}
	}
}
let reverseTimeLine =[];
function endFunctionReset(){
	// const tab = [currentObject, ob1,ob2,ob3]
	for (let ob of [currentObject,ob1,ob2,ob3] ){
		if((ob instanceof Point || ob instanceof GCircle || ob instanceof Circle) && objectArray.indexOf(ob) === -1){
			ob.default();
			objectArray.push(ob);
		}
	}
	currentObject = false;
	ob1 = false;
	ob2 = false;
	ob3 = false;
	//console.log("push?");
	if( mode !== 0) disposer();
	if(timeLine[timeLine.length-1].length === 0){
		// console.log("Tak!",timeLine[timeLine.length-1]);
		timeLine.pop();
	};
}
function undo(){//cofnij
	//console.log(timeLine[timeLine.length-1]);
	for(const el of timeLine[timeLine.length-1]){
		// objectArray.pop();
		scene.remove(objectArray.pop());
		console.log("removing", el);
		if (el.bound !== false && !isNaN(el.bound)){
			console.log("minus!!",pointCount);
			minus();
		}
	}
	reverseTimeLine.push(timeLine.pop());
}
function returnObjects(){
	for(const el of reverseTimeLine[reverseTimeLine.length-1]){
		scene.add(el);
		objectArray.push(el);
		if (el.bound !== false && !isNaN(el.bound)){
			plus(el);
		}
	}
	//timeLine.pop();
	timeLine.push(reverseTimeLine.pop());
}

function disposer(once = false){
	while(reverseTimeLine.length > 0){
		for(const el of reverseTimeLine[reverseTimeLine.length-1]){
			if(el.bound instanceof THREE.Object3D) el.bound.kin.pop();
			else if(el.bound instanceof Array) for(const obj of el.bound) obj.kin.pop();
			el.material.dispose();
			el.geometry.dispose();
		}
		reverseTimeLine.pop()
		if(once) break;
	}
}

let timeLine = [];
// function realize(){

// }
let pointCount = 0, unitMode = 0;
//pointCount.addEventListener("change",()=>{console.log("zmiana!")});
document.getElementById("plus").addEventListener('click', ()=>{plus(false);});

function plus(object = false){
	const data = document.createElement("div");
	data.id = "dane"+pointCount;
	data.className = "dane";
	data.innerHTML = ' &#x3C6 : <input type="text" id="dek'+pointCount+'" class="input" onchange="change('+pointCount+')" autocomplete="off">&#160	&#952 : <input type="text" id="rek'+pointCount+'" class="input"  onchange="change('+pointCount+')" autocomplete="on">'
	document.getElementById("dane").appendChild(data);
	let ob;
	// console.log()
	if(object === false){
		ob = new Point(new THREE.Vector3(0,1,0));
	}else{ 
		ob = object;
		const coords = new THREE.Spherical().setFromVector3(ob.position);
		let phi, theta;
		switch(unitMode){
			case 0:
				phi = coords.phi*(180/Math.PI);
				theta = coords.theta*(180/Math.PI);
				break;
			case 1:
				phi = coords.phi;
				theta = coords.theta;
				break;
			case 2:
				phi = coords.phi/Math.PI;
				theta = coords.theta/Math.PI;
				break;
		}
		document.getElementById("dek"+pointCount).value = phi;
		document.getElementById("rek"+pointCount).value = theta;
	}
		objectArray.push(ob);
	ob.bound = pointCount;

	timeLine.push([]);
	timeLine[timeLine.length - 1].push(ob);


	
	document.getElementById('dane'+pointCount).kin = ob;
	pointCount++;
}

function minus(){
	pointCount--;
	console.log("minus --",pointCount);
	document.getElementById("dane").removeChild(document.getElementById("dane"+(pointCount)));
	//pointCount--;
}
function change(n){
	const v1 = getFraction(document.getElementById('dek'+n).value)
	const v2 = getFraction(document.getElementById('rek'+n).value)
	if(v1 === false) document.getElementById('dek'+n).style.border = 'medium ridge #ff0000';
	else document.getElementById('dek'+n).style.border = '';
	if(v2 === false) document.getElementById('rek'+n).style.border = 'medium ridge #ff0000';
	else document.getElementById('rek'+n).style.border = '';
	document.getElementById('dane'+n).kin.moveSph(v1,v2,unitMode);
	moveChildren(document.getElementById('dane'+n).kin);
}

function unit(n){
	console.log(n,unitMode);
	switch(unitMode){
		case 0:
			document.getElementById("deg").classList.toggle("guzik");
			document.getElementById("deg").classList.toggle("guzikC");
			break;
		case 1:
			document.getElementById("rad").classList.toggle("guzik");
			document.getElementById("rad").classList.toggle("guzikC");
			break;
		case 2:
			document.getElementById("tPI").classList.toggle("guzik");
			document.getElementById("tPI").classList.toggle("guzikC");
			break;
	}
	unitMode = n;
	switch(unitMode){
		case 0:
			document.getElementById("deg").classList.toggle("guzik");
			document.getElementById("deg").classList.toggle("guzikC");
			break;
		case 1:
			document.getElementById("rad").classList.toggle("guzik");
			document.getElementById("rad").classList.toggle("guzikC");
			break;
		case 2:
			document.getElementById("tPI").classList.toggle("guzik");
			document.getElementById("tPI").classList.toggle("guzikC");
			break;
	}
	for(let i=0; i<pointCount; i++){
		change(i)
	}

	let el;
	if(textMark){
		if(n===0){
			for(el of degTable){
				el.visible = true;
			}
			for(el of radTable){
				el.visible = false;
			}
		}else{
			for(el of degTable){
				el.visible = false;
			}
			for(el of radTable){
				el.visible = true;
			}
		}
	}
}

function getFraction (string){
	console.log(isNaN(string));
	if(!isNaN(string)) return string;
	for (let i = 0; i < string.length; i++)
	{
		if(isNaN(string[i]) && string[i]!=='/')
		{
			return false;
		}
	}
	
	let flag = false, a=0, b=0;
	for (let i = 0; i < string.length; i++)
	{
		if(flag)
			b = b*10 + Number(string[i]);
		if(string[i] === '/')
		{
			if(i===0 || i===string.length -1 || flag)
				return false;
			flag = true;
		}
		if(!flag)
			a = a*10 + Number(string[i]);
		
	}
	
	if (b===0)
		return false;
	else
	{
		return a/b;
	}
}

function t1(){
	ob1 = new Point(intersect[0].point);
}
function t2(){
	currentObject = new Circle(ob1.position, posOnSphere());

}
let ttt;
function t3(){
	ttt = new GCircle(unitVector, new THREE.Vector3(1,1,1));
}
//

function t4(){
	scene.remove(objectArray.pop());
}

function t5(){
	const a = objectArray.pop();
	a.bound = false; 
	scene.remove(a);
	console.log(a,a.parent);

}



start();