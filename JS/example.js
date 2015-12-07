var teaVertexPositionBuffer; //teapot vertex buffer
var teaVertexNormalBuffer; //teapot normal buffer
var teaIndexTriBuffer; //teapot face buffer

var tea_verticies = []; //teapot vertex array
var tea_faces = []; //teapot face array
var tea_normals = []; //teapot normals array

var terrainVertexPositionBuffer; //terrain vertex buffer
var terrainVertexNormalBuffer; //terrain normal buffer
var terrainIndexTriBuffer; //terrain face buffer

var terrainVerticesTextureCoordBuffer;

var terrain_verticies = []; //terrain vertex array
var terrain_faces = []; //terrain face array
var terrain_normals = []; //terrain normals array

var terrain_texture;
var terrainImage;

var cube_texture;
var cubeImage_top;
var cubeImage_bottom;
var cubeImage_front;
var cubeImage_back;
var cubeImage_left;
var cubeImage_right;


var theta = [0.0, 0.0, 0.0];
var X_rot = 0;
var Z_rot = 0;

function exampleLoad() {
    this.RL = null; //  Resource Loader
    this.shaderProgram = null; //  The Default Shader Program - super simple one color
    this.terrainShaderProgram = null; //  The Terrain Shader Program
    this.teapotShaderProgram = null; //  The Teapot Shader Program
}

exampleLoad.prototype.loadResources = function () {
    //Requesting Resources
    this.RL = new ResourceLoader(this.resourcesLoaded, this);
    this.RL.addResourceRequest("TEXT", "JS/Assets/TEXT/Square.txt");
    this.RL.addResourceRequest("TEXT", "JS/Assets/TEXT/default_vertex_shader.txt");
    this.RL.addResourceRequest("TEXT", "JS/Assets/TEXT/default_fragment_shader.txt");
    this.RL.addResourceRequest("TEXT", "JS/Assets/TEXT/teapot_0.obj");
    this.RL.addResourceRequest("TEXT", "JS/Assets/TEXT/terrain_vertex_shader.txt");
    this.RL.addResourceRequest("TEXT", "JS/Assets/TEXT/terrain_fragment_shader.txt");
    this.RL.addResourceRequest("TEXT", "JS/Assets/TEXT/teapot_vertex_shader.txt");
    this.RL.addResourceRequest("TEXT", "JS/Assets/TEXT/teapot_fragment_shader.txt");
    // this.RL.addResourceRequest("TEXT", "JS/Assets/TEXT/test_vertex_shader.txt");
    // this.RL.addResourceRequest("TEXT", "JS/Assets/TEXT/test_fragment_shader.txt");
    this.RL.addResourceRequest("IMAGE", "JS/Assets/IMAGE/Test.jpg");
    // this.RL.addResourceRequest("IMAGE", "JS/Assets/IMAGE/beach_cross.hdr");
    // this.RL.addResourceRequest("IMAGE", "JS/Assets/IMAGE/cube_unwrapped.jpg");
    this.RL.addResourceRequest("IMAGE", "JS/Assets/IMAGE/cube_unwrapped_top.jpg");
    this.RL.addResourceRequest("IMAGE", "JS/Assets/IMAGE/cube_unwrapped_bottom.jpg");
    this.RL.addResourceRequest("IMAGE", "JS/Assets/IMAGE/cube_unwrapped_front.jpg");
    this.RL.addResourceRequest("IMAGE", "JS/Assets/IMAGE/cube_unwrapped_back.jpg");
    this.RL.addResourceRequest("IMAGE", "JS/Assets/IMAGE/cube_unwrapped_left.jpg");
    this.RL.addResourceRequest("IMAGE", "JS/Assets/IMAGE/cube_unwrapped_right.jpg");
    this.RL.loadRequestedResources();
};

exampleLoad.prototype.resourcesLoaded = function (exampleLoadReference) {
    // This will only run after the resouces have been loaded.
    exampleLoadReference.completeCheck();
    exampleLoadReference.begin();


};

exampleLoad.prototype.completeCheck = function () {
    //  Run a quick check
    // console.log(this.RL.RLStorage.TEXT[0]);
    // console.log(this.RL.RLStorage.TEXT[1]);
    // console.log(this.RL.RLStorage.TEXT[2]);
    // console.log(this.RL.RLStorage.TEXT[3]);
    // console.log(this.RL.RLStorage.TEXT[4]);
    // console.log(this.RL.RLStorage.TEXT[5]);
    // console.log(this.RL.RLStorage.TEXT[6]);
    // console.log(this.RL.RLStorage.TEXT[7]);
    console.log(this.RL.RLStorage.IMAGE[0]);
    console.log(this.RL.RLStorage.IMAGE[1]);
};

    exampleLoad.prototype.begin = function () {
    // Begin running the program.  
    cubeImage_top = this.RL.RLStorage.IMAGE[1];
    cubeImage_bottom = this.RL.RLStorage.IMAGE[2];
    cubeImage_front = this.RL.RLStorage.IMAGE[3];
    cubeImage_back = this.RL.RLStorage.IMAGE[4];
    cubeImage_left = this.RL.RLStorage.IMAGE[5];
    cubeImage_right = this.RL.RLStorage.IMAGE[6];
    this.initTextures();
    this.initShaders();
    this.initPerspectiveBuffers();
    // this.initPerspectiveBuffers(this.shaderProgram);
    // console.log("default perspective loaded");
    // this.initPerspectiveBuffers(this.terrainShaderProgram);
    // console.log("terrain perspective loaded");
    // this.initPerspectiveBuffers(this.teapot_fragment_shaderhaderProgram);
    this.initSetupBuffers();
    this.initSetupTerrainBuffers();
    this.initSetupTeapotBuffers();

gl.enable(gl.DEPTH_TEST);
  // gl.enable(gl.CULL_FACE);
  // gl.cullFace(gl.BACK);

    //  Once everything has been finished call render from here.
    render(0.0);
};
exampleLoad.prototype.initShaders = function () {
    //  Initialize shaders - we're using that have been loaded in.
    //var vertexShader = null;//this.createShader(this.RL.RLStorage.TEXT[1], gl.VERTEX_SHADER); //  
    // var fragmentShader = null;//this.createShader(this.RL.RLStorage.TEXT[2], gl.FRAGMENT_SHADER); //  
    
    this.shaderProgram = gl.createProgram(); //  Default Single Color
    this.terrainShaderProgram = gl.createProgram(); //  The Terrain Shader Program
    this.teapotShaderProgram = gl.createProgram(); //  The Teapot Shader Program
    
    var vertexShader = this.createShader(this.RL.RLStorage.TEXT[1], gl.VERTEX_SHADER); //  
    var fragmentShader = this.createShader(this.RL.RLStorage.TEXT[2], gl.FRAGMENT_SHADER); //  
    gl.attachShader(this.shaderProgram, vertexShader); //  
    gl.attachShader(this.shaderProgram, fragmentShader); //  
    gl.linkProgram(this.shaderProgram); //  

    var terrainVertexShader = this.createShader(this.RL.RLStorage.TEXT[4], gl.VERTEX_SHADER); //  
    var terrainFragmentShader = this.createShader(this.RL.RLStorage.TEXT[5], gl.FRAGMENT_SHADER); //  
    gl.attachShader(this.terrainShaderProgram, terrainVertexShader); //  
    gl.attachShader(this.terrainShaderProgram, terrainFragmentShader); //  
    gl.linkProgram(this.terrainShaderProgram); //  

    var teapotVertexShader = this.createShader(this.RL.RLStorage.TEXT[6], gl.VERTEX_SHADER); //  
    var teapotFragmentShader = this.createShader(this.RL.RLStorage.TEXT[7], gl.FRAGMENT_SHADER); //  
    gl.attachShader(this.teapotShaderProgram, teapotVertexShader); //  
    gl.attachShader(this.teapotShaderProgram, teapotFragmentShader); //  
    gl.linkProgram(this.teapotShaderProgram); //  
    
    if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) //  
    {
        alert("Unable to initialize the default shader program."); //  
    }
    else if (!gl.getProgramParameter(this.terrainShaderProgram, gl.LINK_STATUS)) //  
    {
        alert("Unable to initialize the terrain shader program."); //  
    }
        else if (!gl.getProgramParameter(this.teapotShaderProgram, gl.LINK_STATUS)) //  
    {
        alert("Unable to initialize the teapot shader program."); //  
    }
    else
    {
        console.log("Shaders Successfully initialized");
    }

    gl.useProgram(this.shaderProgram); //
};
exampleLoad.prototype.createShader = function (shaderSource, shaderType) {
    //  Create a shader, given the source and the type
    var shader = gl.createShader(shaderType); //  
    gl.shaderSource(shader, shaderSource); //  
    gl.compileShader(shader); //  
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) //  
    {
        alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader)); //
        return null; //
    }
    return shader; //
};
exampleLoad.prototype.initPerspectiveBuffers = function (/*shaderProgram*/) {
    //  Create the matrix
    var cameraMatrix = mat4.create();
    // Load it with a perspective matrix.
    mat4.perspective(cameraMatrix, Math.PI / 3, 16.0 / 9.0, 0.1, 60.0);
    //  Create a view matrix
    var viewMatrix = mat4.create();
    //  An identity view matrix
    mat4.identity(viewMatrix);
    var mMatrix = mat4.create();
    //  Set the view matrix - we are 5 units away from all the axes.
    mat4.lookAt(viewMatrix, vec3.fromValues(5, 5, 5), vec3.fromValues(0, 0, 0), vec3.fromValues(0, 1.0, 0));
    
    /************Default Shader*******************/
    gl.useProgram(this.shaderProgram);
    //  Get the perspective matrix location
    var pMatrixUniform = gl.getUniformLocation(this.shaderProgram, "projectionMatrix");
    //  Get the view matrix location
    var vMatrixUniform = gl.getUniformLocation(this.shaderProgram, "viewMatrix");
    var mMatrixUniform = gl.getUniformLocation(this.shaderProgram, "modelMatrix");
    //  Send the perspective matrix
    gl.uniformMatrix4fv(pMatrixUniform, false, cameraMatrix);
    //  Send the view matrix
    gl.uniformMatrix4fv(vMatrixUniform, false, viewMatrix);
    //  Send the model Matrix.
    gl.uniformMatrix4fv(mMatrixUniform, false, mMatrix);

        /************Terrain Shader*******************/
    // var cameraMatrix2 = cameraMatrix;
    // var viewMatrix2 = viewMatrix;
    // var mMatrix2 = mMatrix;
    gl.useProgram(this.terrainShaderProgram);
    //  Get the perspective matrix location
    var pMatrixUniform2 = gl.getUniformLocation(this.terrainShaderProgram, "projectionMatrix");
    //  Get the view matrix location
    var vMatrixUniform2 = gl.getUniformLocation(this.terrainShaderProgram, "viewMatrix");
    var mMatrixUniform2 = gl.getUniformLocation(this.terrainShaderProgram, "modelMatrix");
    //  Send the perspective matrix
    gl.uniformMatrix4fv(pMatrixUniform2, false, cameraMatrix);
    //  Send the view matrix
    gl.uniformMatrix4fv(vMatrixUniform2, false, viewMatrix);
    //  Send the model Matrix.
    gl.uniformMatrix4fv(mMatrixUniform2, false, mMatrix);

        /************Teapot Shader*******************/
    // var cameraMatrix3 = cameraMatrix;
    // var viewMatrix3 = viewMatrix;
    // var mMatrix3 = mMatrix;
    gl.useProgram(this.teapotShaderProgram);
    //  Get the perspective matrix location
    var pMatrixUniform3 = gl.getUniformLocation(this.teapotShaderProgram, "projectionMatrix");
    //  Get the view matrix location
    var vMatrixUniform3 = gl.getUniformLocation(this.teapotShaderProgram, "viewMatrix");
    var mMatrixUniform3 = gl.getUniformLocation(this.teapotShaderProgram, "modelMatrix");
    // var thetaLocation = gl.getUniformLocation(this.teapotShaderProgram, "theta");
    //  Send the perspective matrix
    gl.uniformMatrix4fv(pMatrixUniform3, false, cameraMatrix);
    //  Send the view matrix
    gl.uniformMatrix4fv(vMatrixUniform3, false, viewMatrix);
    //  Send the model Matrix.
    gl.uniformMatrix4fv(mMatrixUniform3, false, mMatrix);
    // Send the theta
    // gl.uniform3fv(thetaLocation, theta);
}
exampleLoad.prototype.initSetupBuffers = function () {
    gl.useProgram(this.shaderProgram);
    //  Set up buffers!
    var vertices = [0, 0, 0, 1.0,
                    1.0, 0, 0, 1.0,
                    0, 0, 1.0, 1.0,
                    1.0, 0, 1.0, 1.0];
    //parse the obj here
    // this.parse_obj();
    basicSquare = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, basicSquare);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexPositionAttribute = gl.getAttribLocation(this.shaderProgram, "vertexPosition"); //
    // gl.bindBuffer(gl.ARRAY_BUFFER, basicSquare); //  
    gl.enableVertexAttribArray(vertexPositionAttribute); //  
    gl.vertexAttribPointer(vertexPositionAttribute, 4, gl.FLOAT, false, 0, 0); //  
    var colors = [0.0 / 255.0, 62 / 255.0, 80 / 255, 1.0,
                 0.0 / 255.0, 62 / 255.0, 80 / 255, 1.0,
                 0.0 / 255.0, 62 / 255.0, 80 / 255, 1.0,
                 0.0 / 255.0, 62 / 255.0, 80 / 255, 1.0];
    basicColors = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, basicColors);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    vertexColorAttribute = gl.getAttribLocation(this.shaderProgram, "vertexColor"); //  
    gl.bindBuffer(gl.ARRAY_BUFFER, basicColors); //  
    gl.enableVertexAttribArray(vertexColorAttribute); //  
    gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0); //  
}

exampleLoad.prototype.initSetupTerrainBuffers = function() {
    gl.useProgram(this.terrainShaderProgram);

    this.terrainShaderProgram.vertexPositionAttribute = gl.getAttribLocation(this.terrainShaderProgram, "vertexPosition");
    // gl.bindBuffer(gl.ARRAY_BUFFER, terrainVertexPositionBuffer);
    gl.enableVertexAttribArray(this.terrainShaderProgram.vertexPositionAttribute); //  

    this.terrainShaderProgram.textureCoordAttribute = gl.getAttribLocation(this.terrainShaderProgram, "aTexCoord");
  gl.enableVertexAttribArray(this.terrainShaderProgram.textureCoordAttribute);
    
    var gridN = 32;
    var gridSize = 5;
    var numT = terrainFromIteration(gridN, -gridSize,gridSize,-gridSize,gridSize, terrain_verticies, terrain_faces, terrain_normals);
    console.log("Generated ", numT, " triangles"); 
    // console.log("Terrain V's", terrain_verticies, "Length", terrain_verticies.length);
    // console.log("Terrain F's", terrain_faces, "Length", terrain_faces.length);

        // Position Buffers
    terrainVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, terrainVertexPositionBuffer);      
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(terrain_verticies), gl.STATIC_DRAW);
    terrainVertexPositionBuffer.itemSize = 3;
    terrainVertexPositionBuffer.numItems = (gridN+1)*(gridN+1);
        // Specify normals to be able to do lighting calculations
    terrainVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, terrainVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(terrain_normals),
                  gl.STATIC_DRAW);
    terrainVertexNormalBuffer.itemSize = 3;
    terrainVertexNormalBuffer.numItems = (gridN+1)*(gridN+1);
        // Specify faces of the terrain 
    terrainIndexTriBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, terrainIndexTriBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(terrain_faces),
                  gl.STATIC_DRAW);
    terrainIndexTriBuffer.itemSize = 1;
    terrainIndexTriBuffer.numItems = numT*3;

    gl.vertexAttribPointer(this.terrainShaderProgram.vertexPositionAttribute, /*terrainVertexPositionBuffer.itemSize*/3, gl.FLOAT, false, 0, 0); //  

  // var textureCoordinates = [
  //   0.0,  0.0,
  //   1.0,  0.0,
  //   1.0,  1.0,
  //   0.0,  1.0,
  // ];

    var textureCoordinates = [];

    for (var i = 0; i < gridN+1; i++) {
            for (var j = 0; j < gridN+1; j++) {
            textureCoordinates.push(i/(gridN));
            textureCoordinates.push(j/(gridN));
            // textureCoordinates.push(i);
            // textureCoordinates.push(j);
        }
    }
    // console.log("TEXT CIIRDs",textureCoordinates);

    terrainVerticesTextureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, terrainVerticesTextureCoordBuffer);
  
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
                gl.STATIC_DRAW);

    

    // temp_buffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, temp_buffer);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(terrain_verticies), gl.STATIC_DRAW);
    // this.terrainShaderProgram.vertexPositionAttribute = gl.getAttribLocation(this.terrainShaderProgram, "vertexPosition");
    // gl.bindBuffer(gl.ARRAY_BUFFER, temp_buffer);
    // gl.enableVertexAttribArray(this.terrainShaderProgram.vertexPositionAttribute); //  
    // gl.vertexAttribPointer(this.terrainShaderProgram.vertexPositionAttribute, terrainVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0); //  
};

exampleLoad.prototype.initSetupTeapotBuffers = function () {
    // gl.useProgram(this.teapotShaderProgram);
    gl.useProgram(this.teapotShaderProgram);
    //  Set up buffers by parsing the obj
    //parse the obj here
    this.parse_obj();

    teaVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, teaVertexPositionBuffer);      
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tea_verticies), gl.DYNAMIC_DRAW);
    teaVertexPositionBuffer.itemSize = 3;
    teaVertexPositionBuffer.numItems = tea_verticies.length/3;//(gridN+1)*(gridN+1);

    this.teapotShaderProgram.vertexPositionAttribute = gl.getAttribLocation(this.teapotShaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(this.teapotShaderProgram.vertexPositionAttribute); //  
    gl.vertexAttribPointer(this.teapotShaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0); //  

    teaNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, teaNormalBuffer);      
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tea_normals), gl.DYNAMIC_DRAW);
    teaNormalBuffer.itemSize = 3;
    teaNormalBuffer.numItems = tea_normals.length/3;//(gridN+1)*(gridN+1);

    this.teapotShaderProgram.normalAttribute = gl.getAttribLocation(this.teapotShaderProgram, "aNormal");
    gl.enableVertexAttribArray(this.teapotShaderProgram.normalAttribute); //  
    gl.vertexAttribPointer(this.teapotShaderProgram.normalAttribute, 3, gl.FLOAT, false, 0, 0); //  

    // // Specify faces of the teapot 
    teaIndexTriBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, teaIndexTriBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tea_faces),
                  gl.STATIC_DRAW);
    teaIndexTriBuffer.itemSize = 1;
    teaIndexTriBuffer.numItems = tea_faces.length;

}

exampleLoad.prototype.draw = function () {
    //  Draw function - called from render in index.js

    //Draw the red square
    // gl.useProgram(this.shaderProgram);
    // // gl.useProgram(this.terrainShaderProgram);
    // gl.clearColor(0.1, 0.1, 0.1, 1.0); //  Set the clear color
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); //  Clear the color as well as the depth buffer
    // gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); //  Draw

    //Draw terrain

    gl.useProgram(this.terrainShaderProgram);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, terrain_texture);
    gl.uniform1i(gl.getUniformLocation(this.terrainShaderProgram, "uSampler"), 0);


    // gl.useProgram(this.shaderProgram);
    gl.polygonOffset(0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, terrainVertexPositionBuffer);
    gl.vertexAttribPointer(this.terrainShaderProgram.vertexPositionAttribute, terrainVertexPositionBuffer.itemSize, 
                            gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, terrainVerticesTextureCoordBuffer);
    gl.vertexAttribPointer(this.terrainShaderProgram.textureCoordAttribute, 2, 
                            gl.FLOAT, false, 0, 0);

    // Bind normal buffer
    // gl.bindBuffer(gl.ARRAY_BUFFER, terrainVertexNormalBuffer);
    // gl.vertexAttribPointer(this.terrainShaderProgram.vertexNormalAttribute, 
    //                            terrainVertexNormalBuffer.itemSize,
    //                            gl.FLOAT, false, 0, 0);   
        
    //Draw 
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, terrainIndexTriBuffer);
    gl.drawElements(gl.TRIANGLES, terrainIndexTriBuffer.numItems, gl.UNSIGNED_SHORT,0); 


    //Draw teapot
    gl.useProgram(this.teapotShaderProgram);
    var thetaLocation = gl.getUniformLocation(this.teapotShaderProgram, "theta");
    // Send the theta
    gl.uniform3fv(thetaLocation, theta);

    gl.activeTexture(gl.TEXTURE0);
    gl.uniform1i(gl.getUniformLocation(this.terrainShaderProgram, "texMap"), 0);
    // gl.useProgram(this.shaderProgram);
    gl.polygonOffset(0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, teaVertexPositionBuffer);
    gl.vertexAttribPointer(this.teapotShaderProgram.vertexPositionAttribute, teaVertexPositionBuffer.itemSize, 
                            gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, teaNormalBuffer);
    gl.vertexAttribPointer(this.teapotShaderProgram.normalAttribute, teaNormalBuffer.itemSize, 
                            gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, teaIndexTriBuffer);//DRAW Teapot
    gl.drawElements(gl.TRIANGLES, teaIndexTriBuffer.numItems/*-30*/, gl.UNSIGNED_SHORT,0);
}
exampleLoad.prototype.parse_obj = function() {
    //TEXT[3] = obj
    var temp_parse_line = this.RL.RLStorage.TEXT[3].split('\n');
    for (var i = 0; i < temp_parse_line.length; i++){
        var temp_parse_part = temp_parse_line[i].split(' ');
        // for (var j = 0; j < temp_parse_part.length; j++) {
            // for (var j = 0; j < temp_parse_part.length; j++) {
            //     console.log(temp_parse_part[j]);
            // };
            if (temp_parse_part[0] == 'v' ) {
                tea_verticies.push(parseFloat(temp_parse_part[1]));
                tea_verticies.push(parseFloat(temp_parse_part[2]));
                tea_verticies.push(parseFloat(temp_parse_part[3]));
                // tea_verticies.push(0.0);
                tea_normals.push(0.0);
                tea_normals.push(0.0);
                tea_normals.push(1.0);
            }
            else if (temp_parse_part[0] == 'f') {
                tea_faces.push(parseInt(temp_parse_part[2]-1));
                tea_faces.push(parseInt(temp_parse_part[3]-1));
                tea_faces.push(parseInt(temp_parse_part[4]-1));
            }
            else {
                //do nothing
            }
        // }
    }
    // console.log(tea_verticies);
    // console.log(tea_faces);
    // for (var i = 0; i < tea_verticies.length; i++) {
    //     console.log(tea_verticies[i]);
    // };
    // for (var i = 0; i < tea_faces.length; i++) {
    //     console.log(tea_faces[i]);
    // };
    //generate normals
    var vec_a = vec3.create();
    var vec_b = vec3.create();
    var vec_result = vec3.create();

    for (var i = 0; i < tea_faces.length/3; i++) {
        vec3.sub(vec_a,
                vec3.fromValues(tea_verticies[3*tea_faces[3*i+1]+0],tea_verticies[3*tea_faces[3*i+1]+1],tea_verticies[3*tea_faces[3*i+1]+2]),
                vec3.fromValues(tea_verticies[3*tea_faces[3*i]+0],tea_verticies[3*tea_faces[3*i]+1],tea_verticies[3*tea_faces[3*i]+2]));
        // console.log(vec_a);
        vec3.sub(vec_b,
                vec3.fromValues(tea_verticies[3*tea_faces[3*i+2]+0],tea_verticies[3*tea_faces[3*i+2]+1],tea_verticies[3*tea_faces[3*i+2]+2]),
                vec3.fromValues(tea_verticies[3*tea_faces[3*i]+0],tea_verticies[3*tea_faces[3*i]+1],tea_verticies[3*tea_faces[3*i]+2]));
        // console.log(vec_b);
        vec3.cross(vec_result,vec_a,vec_b);
        vec3.normalize(vec_result,vec_result);
        // console.log(vec_result);
        // console.log(vec_result[0],vec_result[1],vec_result[2]);
        tea_normals[3*tea_faces[3*i]+0] += vec_result[0];
        tea_normals[3*tea_faces[3*i]+1] += vec_result[1];
        tea_normals[3*tea_faces[3*i]+2] += vec_result[2];

        tea_normals[3*tea_faces[3*i+1]+0] += vec_result[0];
        tea_normals[3*tea_faces[3*i+1]+1] += vec_result[1];
        tea_normals[3*tea_faces[3*i+1]+2] += vec_result[2];
        
        tea_normals[3*tea_faces[3*i+2]+0] += vec_result[0];
        tea_normals[3*tea_faces[3*i+2]+1] += vec_result[1];
        tea_normals[3*tea_faces[3*i+2]+2] += vec_result[2];
    };
    console.log("normals length", tea_normals.length);
    console.log("verticies length", tea_verticies.length);
    console.log("normal values",tea_normals);
    var vec_normal = vec3.create();
    for (var i = 0; i < tea_normals/3; i++) {
        vec_normal = vec3.fromValues(tea_normals[3*i+0],tea_normals[3*i+1],tea_normals[3*i+2]);
        vec3.normalize(vec_normal,vec_normal);
        console.log("normal=",vec_normal);
        tea_normals[3*i+0] = vec_normal[0];
        tea_normals[3*i+1] = vec_normal[1];
        tea_normals[3*i+2] = vec_normal[2];
    };
    // console.log("normal values",tea_normals);

};

exampleLoad.prototype.initTextures = function() {
  //   console.log("INIT TEXTURES");
  // terrain_texture = gl.createTexture();
  // terrainImage = new Image();
  
  // console.log(terrainImage);
  // terrainImage.onload = function() { handleTextureLoaded(terrainImage, terrain_texture); }
  // terrainImage = this.RL.RLStorage.IMAGE[0];

  // // terrainImage.src = this.RL.RLStorage.TEXT[7];
    terrain_texture = gl.createTexture();
    terrainImage = new Image();
    terrainImage.onload = function() { handleTextureLoaded(terrainImage, terrain_texture); }
    terrainImage.src = "JS/Assets/IMAGE/Test.jpg";

    cube_texture = gl.createTexture();
    //add image stuff here



    var red = new Uint8Array([255, 0, 0, 255]);
    var green = new Uint8Array([0, 255, 0, 255]);
    var blue = new Uint8Array([0, 0, 255, 255]);
    var cyan = new Uint8Array([0, 255, 255, 255]);
    var magenta = new Uint8Array([255, 0, 255, 255]);
    var yellow = new Uint8Array([255, 255, 0, 255]); 
    gl.bindTexture(gl.TEXTURE_CUBE_MAP,cube_texture);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP,null);

    // gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA,
    //  1, 1, 0, gl.RGBA,gl.UNSIGNED_BYTE, red);
    // gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA,
    //  1, 1, 0, gl.RGBA,gl.UNSIGNED_BYTE, green);
    //  gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA,
    //  1, 1, 0, gl.RGBA,gl.UNSIGNED_BYTE, blue);
    //  gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA,
    //  1, 1, 0, gl.RGBA,gl.UNSIGNED_BYTE, cyan);
    //  gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA,
    //  1, 1, 0, gl.RGBA,gl.UNSIGNED_BYTE, yellow);
    //  // gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA,
    //  // 1, 1, 0, gl.RGBA,gl.UNSIGNED_BYTE, cyan);
    //  gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA,
    //  1, 1, 0, gl.RGBA,gl.UNSIGNED_BYTE, magenta);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, cube_texture);
   gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cubeImage_left);
   gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, cube_texture);
   gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cubeImage_right);
   gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, cube_texture);
   gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cubeImage_top);
   gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, cube_texture);
   gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cubeImage_bottom);
   gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, cube_texture);
   gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cubeImage_front);
   gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, cube_texture);
   gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cubeImage_back);
   gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

     gl.bindTexture(gl.TEXTURE_CUBE_MAP, cube_texture);
     gl.generateMipmap(gl.TEXTURE_CUBE_MAP);

}

handleTextureLoaded = function (image, texture) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, null);
  console.log("TEXTURE LOADED");
}