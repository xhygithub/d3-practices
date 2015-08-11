
var data1 = {
 "name": "flare",
 // "number":800,
 // "duration": 60,
 "children": [
  {
   "name": "analytics",
   "number": [500,300,200,200],
   "duration": [41,2,13,21],
   "children": [
    {
     "name": "cluster",
     "number": [150,126,32,120],
     "duration": [1,5,8,0.1],
     "children": [
      {"name": "AgglomerativeCluster", "number": [120,12,32,10],"duration": [1,50,1,0.41],"size": 3938},
      {"name": "CommunityStructure", "number": [10,16,72,120],"duration": [10,5,4,5.1],"size": 3812},
      {"name": "MergeEdge", "number": [150,126,32,120],"duration": [1,5,8,11.1], "size": 743}
     ]
    },
    {
     "name": "graph",
     "number": [100,25,35,70],
     "duration": [6,4,12,40],
     "children": [
      {"name": "BetweennessCentrality", "number": [150,126,32,120],"duration": [1,5,8,20.1],"size": 3534},
      {"name": "LinkDistance", "number": [150,126,32,120], "duration": [1,5,38,0.1],"size": 5731}
     ]
    },
    {
     "name": "optimization",
     "number": [150,126,32,120],
     "duration": [1,5,8,1],
     "children": [
      {"name": "AspectRatioBanker", "number": [150,126,32,120], "duration": [1,5,0.8,4.1],"size": 7074}
     ]
    }
   ]
  },
  {
   "name": "animate",
   "number": [150,126,32,120],
   "duration": [1,50,8,8],
   "children": [
    {"name": "Easing", "number": [150,126,32,120], "duration": [1,5,18,11],"size": 17010},
    {"name": "FunctionSequence", "number": [150,126,32,120], "duration": [1,15,28,1],"size": 5842},
    {
     "name": "interpolate",
     "number": [150,126,32,120],
     "duration": [1,5,8,20],
     "children": [
      {"name": "ArrayInterpolator", "number": [150,126,30,1], "duration": [11,5,8,0.1],"size": 1983},
      {"name": "ColorInterpolator", "number": [50,126,32,10], "duration": [1,45,8,0.1],"size": 2047},
      {"name": "DateInterpolator", "number": [150,126,32,100], "duration": [1,5,8,8.1],"size": 1375},
      {"name": "Interpolator", "number": [150,26,2,120], "duration": [1,5,8,0.1],"size": 8746},
      {"name": "MatrixInterpolator", "number": [150,126,32,220], "duration": [1,5,8,0.1],"size": 2202},
      {"name": "NumberInterpolator", "number": [70,126,32,70], "duration": [1,5,8,0.1],"size": 1382},
      {"name": "ObjectInterpolator", "number": [150,126,32,12], "duration": [1,5,8,3.1],"size": 1629},
      {"name": "PointInterpolator", "number": [150,2.6,32,20], "duration": [1,5,8,0.1],"size": 1675},
      {"name": "RectangleInterpolator", "number": [150,2,32,120], "duration": [1,5,8.3,5.1], "size": 2042}
     ]
    },
    {"name": "ISchedulable", "number": [150,1,32,1], "duration": [1,5,8.2,2.1], "size": 1041},
    {"name": "ISchedulable", "number": [10,6,32,10], "duration": [1,5,28,0.1], "children":[{"name": "Parallel", "number": [150,126,32,120],"duration": [1,5,8,0.1],"size": 5176},{"name": "Parallel", "number": [150,126,32,120],"duration": [1,5,8,0.1],"size": 5176}]},
    {"name": "Parallel", "number": [150,56,32,20],"duration": [1,5,8,1],"size": 5176},
    {"name": "Pause", "number": [50,26,32,120],"duration": [1,5,8,0.1],"size": 449},
    {"name": "Scheduler", "number": [150,26,3,120],"duration": [1,6,8,0.1],"size": 5593},
    {"name": "Sequence", "number": [30,16,32,10],"duration": [1,5,0.8,1],"size": 5534},
    {"name": "Transition", "number": [30,26,32,120],"duration": [1,51,18,1],"size": 9201},
    {"name": "Transitioner", "number": [10,126,32,110],"duration": [1.5,5,8,0.1],"size": 19975},
    {"name": "TransitionEvent", "number": [250,26,32,12],"duration": [8,5,18,31],"size": 1116},
    {"name": "Tween", "number": [20,96,321,90],"duration": [11,25,8,0.1],"size": 6006}
   ]
  }
 ]
};


var data2 ={
 "name": "flare",
 // "number":800,
 // "duration": 60,
 "children": [
  {
   "name": "analytics",
   "number": 300,
   "duration": 41,
   "children": [
    {
     "name": "cluster",
     "number": 50,
     "duration": 1,
     "children": [
      {"name": "AgglomerativeCluster", "number": 80,"duration": 11,"size": 3938},
      {"name": "CommunityStructure", "number": 100,"duration": 11,"size": 3812},
      {"name": "MergeEdge", "number": 200,"duration": 1, "size": 743}
     ]
    },
    {
     "name": "graph",
     "number": 100,
     "duration": 6,
     "children": [
      {"name": "BetweennessCentrality", "number": 200,"duration": 41,"size": 3534},
      {"name": "LinkDistance", "number": 200, "duration": 1,"size": 5731}
     ]
    },
    {
     "name": "optimization",
     "number": 150,
     "duration": 51,
     "children": [
      {"name": "AspectRatioBanker", "number": 200, "duration": 0.1,"size": 7074}
     ]
    }
   ]
  },
  {
   "name": "animate",
   "number": 500,
   "duration": 5,
   "children": [
    {"name": "Easing", "number": 200, "duration": 11,"size": 17010},
    {"name": "FunctionSequence", "number": 200, "duration": 26,"size": 5842},
    {
     "name": "interpolate",
     "number": 200,
     "duration": 1,
     "children": [
      {"name": "ArrayInterpolator", "number": 200, "duration": 25,"size": 1983},
      {"name": "ColorInterpolator", "number": 300, "duration": 0.1,"size": 2047},
      {"name": "DateInterpolator", "number": 70, "duration": 31,"size": 1375},
      {"name": "Interpolator", "number": 20, "duration": 11,"size": 8746},
      {"name": "MatrixInterpolator", "number": 200, "duration": 0.1,"size": 2202},
      {"name": "NumberInterpolator", "number": 200, "duration": 7,"size": 1382},
      {"name": "ObjectInterpolator", "number": 200, "duration": 0.1,"size": 1629},
      {"name": "PointInterpolator", "number": 200, "duration": 5,"size": 1675},
      {"name": "RectangleInterpolator", "number": 2, "duration": 0.1, "size": 2042}
     ]
    },
    {"name": "ISchedulable", "number": 80, "duration": 1, "size": 1041},
    {"name": "ISchedulable", "number": 80, "duration": 10.1, "children":[{"name": "Parallel", "number": 20,"duration": 0.1,"size": 5176},{"name": "Parallel", "number": 20,"duration": 0.1,"size": 5176}]},
    {"name": "Parallel", "number": 20,"duration": 0.1,"size": 5176},
    {"name": "Pause", "number": 100,"duration": 11,"size": 449},
    {"name": "Scheduler", "number": 200,"duration": 51,"size": 5593},
    {"name": "Sequence", "number": 20,"duration": 31,"size": 5534},
    {"name": "Transition", "number": 200,"duration": 1,"size": 9201},
    {"name": "Transitioner", "number": 2,"duration": 21,"size": 19975},
    {"name": "TransitionEvent", "number": 10,"duration": 21,"size": 1116},
    {"name": "Tween", "number": 2,"duration": 11,"size": 6006}
   ]
  }
 ]
};
