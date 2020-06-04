let roads1={
  "graph": {
    "directed": false,
    "nodes": [
      { "id": 0 },
      { "id": 1 },
      { "id": 2 },
      { "id": 3 },
      { "id": 4 }
    ],
    "edges": [
      {
        "source": 0,
        "target": 1,
        "metadata": {
          "distance": 5
        }
      },
      {
        "source": 1,
        "target": 3,
        "metadata": {
          "distance": 9
        }
      },
      {
        "source": 3,
        "target": 2,
        "metadata": {
          "distance": 6
        }
      },
      {
        "source": 2,
        "target": 4,
        "metadata": {
          "distance": 3
        }
      },
      {
        "source": 4,
        "target": 3,
        "metadata": {
          "distance": 8
        }
      },
      {
       "source": 4,
       "target": 0,
       "metadata": {
         "distance": 2
       }
     }
    ]
  }
}
let roads2={
  "graph": {
    "directed": false,
    "nodes": [
      { "id": 0 },
      { "id": 1 },
      { "id": 2 },
     
    ],
    "edges": [
      {
        "source": 0,
        "target": 1,
        "metadata": {
          "distance": 1
        }
      },
      {
        "source": 1,
        "target": 2,
        "metadata": {
          "distance": 1
        }
      },
      {
        "source": 0,
        "target": 2,
        "metadata": {
          "distance": 3
        }
      },
      
    ]
  }
}
let roads3={
  "graph": {
    "directed": false,
    "nodes": [
      { "id": 0 },
      { "id": 1 },
      { "id": 2 },
     
    ],
    "edges": [
      {
        "source": 0,
        "target": 1,
        "metadata": {
          "distance": 1
        }
      },
      {
        "source": 1,
        "target": 2,
        "metadata": {
          "distance": 1
        }
      },
      {
        "source": 0,
        "target": 2,
        "metadata": {
          "distance": 1
        }
      },
      
    ]
  }
}
let roads4={
  "graph": {
    "directed": false,
    "nodes": [
      { "id": 0 },
      { "id": 1 },
      { "id": 2 },
     
    ],
    "edges": [
      {
        "source": 0,
        "target": 1,
        "metadata": {
          "distance": 1
        }
      },
      {
        "source": 1,
        "target": 2,
        "metadata": {
          "distance": 1
        }
      },
      {
        "source": 0,
        "target": 2,
        "metadata": {
          "distance": 2
        }
      },
      
    ]
  }
}
function navigate(roads,start,end){
 let path=[];
 for(let i=0;i<roads.graph.edges.length;i++){
   let temp=[];
   temp.push(roads.graph.edges[i].source);
   temp.push(roads.graph.edges[i].target);
   path.push(temp);
 } 
    //  console.log("pathArray");
    //  console.log(path);
     let result=[];
     result=iteratePath(start,end,path);
     for(let i=0;i<result.length;i++){
         result[i].unshift(start);
        }
    //  console.log("result=");
    //  console.log(result);
     let distanceArray=[];
  for(let i=0;i<result.length;i++){
     distanceArray.push(calculateDistance(result[i],roads));
  }
  //  console.log('distanceArray='+distanceArray);
  // console.log(validPathsArray[indexOfSmallest(distanceArray)]);
  return {"distance":Math.min(...distanceArray),"path":result[indexOfSmallest(distanceArray)]}
     
}
function distanceBetweenNodes(node1,node2,roads){
  // console.log("calculating distance between ");
  // console.log(node1);
  // console.log(node2);
  for(let i=0;i<roads.graph.edges.length;i++){
    if(roads.graph.edges[i].source===node1 && roads.graph.edges[i].target===node2){
      //  console.log(roads.graph.edges[i].metadata.distance);
      return roads.graph.edges[i].metadata.distance;
    }
    if(roads.graph.edges[i].source===node2 && roads.graph.edges[i].target===node1){
      //  console.log(roads.graph.edges[i].metadata.distance);
      return roads.graph.edges[i].metadata.distance;
    }
  }
}
function indexOfSmallest(a) {
 var lowest = 0;
 for (var i = 1; i < a.length; i++) {
  if (a[i] < a[lowest]) lowest = i;
 }
 return lowest;
}
function calculateDistance(path,roads){
  let distance=0;
  for(let i=0;i<path.length-1;i++){
    distance=distance+parseInt(distanceBetweenNodes(path[i],path[i+1],roads));
  }
  //  console.log("distance="+distance);
  return distance;
}
function getNodesContainingStart(start,path){
  let temp=[];
for(let i=0;i<path.length;i++){
   if(path[i][0]===start || path[i][1]===start){
     temp.push(path[i]);
    }
}
return temp;
}
function updateStart(node,start){
  // console.log("node=");
  // console.log(node);
  // console.log("start=");
  // console.log(start);
  if(node[0]===start){
    return node[1];
  }
  else{
    return node[0];
  }
  
}
function iteratePath(start,end,path){
  // console.log("start="+start);
  // console.log("end="+end);
   let result=[];
   let candidateNodes=[];
   
   if(startAndEndPresentInPath(start,end,path)){
      //  console.log("start end present in candidate Nodes");
      result.push([end]);
      // console.log(result);
      return result;
    }
    
   let nodesContainingStart=getNodesContainingStart(start,path);
   if(nodesContainingStart.length===0){
     return result;
   }
  //  console.log("nodes containing start=");
  //  console.log(nodesContainingStart);
   for(let i=0;i<nodesContainingStart.length;i++){
    //  console.log("i="+i);
    //  console.log(nodesContainingStart[i]);
     candidateNodes=getCandidateNodes(nodesContainingStart[i],path);
    //  console.log("candidate Nodes="+"for"+nodesContainingStart[i]);
    //  console.log(candidateNodes);
    //  console.log("start is having value="+start);
     let newStart=updateStart(nodesContainingStart[i],start);
    //  console.log("updated value of start="+newStart);
      let output=iteratePath(newStart,end,candidateNodes);
     
      if(output.length!==0){
        for(let i=0;i<output.length;i++){
         output[i].unshift(newStart);
        }
        // console.log("output=");
        // console.log(output); 
        result=result.concat(output);
        
      }
      }
     return result;
   }
function startAndEndPresentInPath(start,end,path){
  for(let i=0;i<path.length;i++){
    if(path[i][0]===start && path[i][1]===end ||
    path[i][1]===start && path[i][0]===end){
      return true;
    }
  }
  return false;
}
function getCandidateNodes(node,path){
  let candidateNodes=[];
  for(let i=0;i<path.length;i++){
    if(path[i]!==node){
      candidateNodes.push(path[i]);
    }
  }
  return candidateNodes;
}
 console.log(navigate(roads1,2,0));
 console.log(navigate(roads1,0,2));
console.log(navigate(roads2,0,2));
console.log(navigate(roads2,2,0));
console.log(navigate(roads2,2,1));
console.log(navigate(roads3,0,2));
console.log(navigate(roads4,0,2));
// # Road Navigation


// Road systems can be imagined as a graph of intersections connected by lines. The advantage of this is it makes it easier to find the shortest path between any two intersections.

// ## Task
// Write a function that takes as arguments:

// - A graph of the road system
// - The starting intersection (node)
// - The ending intersection (node)

// And returns an object containing information about the shortest path.

// ## Format of the road graph

// As an example, this is what one road graph could look like (in JSON):
// ```json
// {
//   "graph": {
//     "directed": false,
//     "nodes": [
//       { "id": 0 },
//       { "id": 1 },
//       { "id": 2 },
//        { "id": 3 }
//     ],
//     "edges": [
//       {
//         "source": 0,
//         "target": 1,
//         "metadata": {
//           "distance": 5
//         }
//       },
//       {
//         "source": 1,
//         "target": 3,
//         "metadata": {
//           "distance": 9
//         }
//       },
//       {
//         "source": 3,
//         "target": 2,
//         "metadata": {
//           "distance": 6
//         }
//       },
//       {
//         "source": 2,
//         "target": 4,
//         "metadata": {
//           "distance": 3
//         }
//       },
//       {
//         "source": 4,
//         "target": 3,
//         "metadata": {
//           "distance": 8
//         }
//       },
//       {
//        "source": 4,
//        "target": 0,
//        "metadata": {
//          "distance": 2
//        }
//      }
//     ]
//   }
// }
// ```

// Additionally, all edges are *two way roads* (undirected), so you don't need to worry about that. Which node is in `source` 
// and which is in `target` does not matter. Edges may contain the property `label`, which is just a street name and not necessary 
// for you to use.

// And remember, the goal is to *minimize* the sum of all the `metadata.distance` properties of edges used.

// ## Format of return value
// The return value should be an *object* with properties `distance` and `path`.

// `distance` should be the number that is the total sum of the distance metadata on each edge used.

// `path` should be an *array of numbers*, where each number is the id of a node used along the path from the start to the end.

// For example, if the shortest path from node 1 to node id 2 was going from node 1 to node 3 to node 2, then the result should be [1, 3, 2]. You must include the starting and ending nodes in the path.

// If two paths have the same distance, it does not matter which one you return (which won't happen in the tests).

// ## Example
// In the example road graph, if it is asked to find the path from node id 2 to node id 0, the function call would be

// ```js
//     navigate(roads, 2, 0) // Where roads is the example graph structure
// ```
// And you should return
// ```
//     {
//       "distance": 5,
//       "path": [ 2, 4, 0 ]
//     }
// ```

// ## Notes
// - If two paths have the same distance, it doesn't matter which one you return (which won't happen in the tests).
// - Make sure to include the starting and ending nodes in the path.
// - The order of the path array *does* matter.
// - Distance between 2 nodes is located in the `metadata.distance` property of the edge connecting them.