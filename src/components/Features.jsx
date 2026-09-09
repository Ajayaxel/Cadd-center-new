import React, { useCallback, useEffect, useState } from 'react';
import { Sparkles, Layers, ArrowUpRight, GraduationCap } from 'lucide-react';
import CourseBottomSheet from './CourseBottomSheet';
import Button from './ui/Button';

// Complete Master Course Catalog matching authentic CADD Centre Perinthalmanna curricula
export const ALL_COURSES = [
  {
    id: 'course-interior',
    title: 'Executive Diploma in Interior Design',
    discipline: 'Interior Design',
    category: 'Interior Design',
    duration: '240 hours',
    tools: 'AutoCAD · 3ds Max · SketchUp · V-Ray · Lumion · Coohom',
    description: 'Complete interior design workflow from 2D floor plans, 3D modeling, realistic materials, photorealistic lighting, walkthroughs, to post-production.',
    img: '/images/courses/interior-diploma.png',
    popularAreas: ['2D Planning & Drafting', '3D Spatial Modeling', 'Material & Texture Creation', 'Photorealistic Lighting', 'Real-Time Walkthroughs', 'Post-Production'],
    toolGroups: [
      { category: 'AutoCAD', tools: ['AutoCAD', 'AutoCAD Architecture'] },
      { category: '3ds Max', tools: ['V-Ray', 'Corona Renderer', 'Enscape', 'Forest Pack', 'Chaos Cosmos', 'Adobe Photoshop'] },
      { category: 'SketchUp', tools: ['V-Ray', 'Enscape', '1001bit Tools'] },
      { category: 'Visualization', tools: ['Lumion Walkthroughs', 'Asset Libraries', 'Coohom'] }
    ],
    workflow: ['Concept & Layout', '2D Working Drawing', '3D Parametric Model', 'Material & Texture', 'Lighting & Render', 'Client Walkthrough'],
    keyModules: [
      '2D Planning & Drafting — Create professional floor plans, layouts, and working drawings using AutoCAD.',
      '3D Modeling — Develop detailed interior and architectural models using 3ds Max and SketchUp.',
      'Material & Texture Creation — Apply realistic materials, textures, and finishes for interior spaces.',
      'Lighting & Rendering — Produce high-quality photorealistic renders using V-Ray and Corona Renderer.',
      'Real-Time Visualization — Create interactive walkthroughs and design presentations using Enscape and Lumion.',
      'Furniture & Asset Integration — Use industry-standard libraries and tools such as Forest Pack, Chaos Cosmos, and 1001bit Tools.',
      'Post-Production — Enhance architectural visuals and presentations using Adobe Photoshop.',
      'Complete Design Workflow — Concept → 2D Plan → 3D Model → Materials → Lighting → Rendering → Presentation.'
    ],
    careerPaths: ['Architect', 'Interior Designer', 'Interior Decorator', 'Colour Consultant', 'Design Educator / Instructor'],
    seoLocation: 'Best Interior Design Course in Perinthalmanna, Malappuram with 100% Placement Support'
  },
  {
    id: 'course-master-bim',
    title: 'Master Certificate in BIM',
    discipline: 'BIM [Building Information Modelling]',
    category: 'Master BIM Program',
    duration: '240 hours',
    tools: 'Revit (Arch/Struct/MEP) · Navisworks · BIM 360 · Dynamo · BIM Theory',
    description: 'Comprehensive Building Information Modeling program covering ISO 19650 standards, LOD 100-350 coordination, clash detection, CDE, and ACC workflows.',
    img: '/images/courses/bim-master-certificate.png',
    popularAreas: ['BIM Theory & Concepts', 'ISO 19650 Standards', 'LOD 100-350 Modeling', 'Multi-Discipline Coordination', 'Clash Detection', 'Dynamo Automation'],
    toolGroups: [
      { category: 'AutoCAD', tools: ['AutoCAD', 'AutoCAD Architecture'] },
      { category: 'Revit Suite', tools: ['Revit Architecture', 'Revit Structure', 'Revit MEP'] },
      { category: 'BIM Coordination & Collaboration', tools: ['Autodesk Construction Cloud (ACC / BIM 360)', 'Navisworks Manage', 'Dynamo', 'COBie', 'BIM Theory'] }
    ],
    workflow: ['BIM Concept & Standards', 'Schematic LOD 200', 'Detailed LOD 300', 'LOD 350 Coordination', 'Clash Resolution', 'CDE Management'],
    keyModules: [
      'BIM Theory & Fundamentals — Introduction to BIM principles, Industry 4.0 integration, and ISO 19650 international standards.',
      'Level of Information Need (LOIN) & LOD 100 Conceptual to LOD 200 Schematic Design.',
      'Engineering Drawing Fundamentals & 3D BIM Multi-Disciplinary Modeling.',
      'LOD 300 Detailed Modeling across Architectural, Structural, and MEP disciplines.',
      'LOD 350 BIM Coordination, clash detection, and conflict resolution in Navisworks.',
      'Common Data Environment (CDE) management and cloud collaboration with BIM 360 & ACC.'
    ],
    careerPaths: ['BIM Manager', 'BIM Coordinator', 'BIM Modeler', 'BIM Engineer', 'BIM Consultant'],
    seoLocation: 'Best Master Certificate in BIM Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-bim-arch',
    title: 'BIM for Architecture',
    discipline: 'BIM [Building Information Modelling]',
    category: 'Architectural BIM',
    duration: '160 hours',
    tools: 'Revit Architecture · Revit Structure · Revit MEP · Navisworks',
    description: 'Master architectural BIM modeling, parametric design, documentation, structural coordination, and multi-disciplinary model review.',
    img: '/images/courses/bim-architecture.png',
    popularAreas: ['Architectural Modeling', 'Parametric Families', 'Model Coordination', 'Clash Detection', 'Sheet Documentation', 'Navisworks Review'],
    toolGroups: [
      { category: 'Core BIM', tools: ['Revit Architecture', 'Revit Structure', 'Revit MEP (Basics)'] },
      { category: 'Review & Coordination', tools: ['Navisworks Manage', 'BIM Documentation'] }
    ],
    workflow: ['Architectural Design', 'BIM Modeling', 'Structural & MEP Integration', 'Model Coordination', 'Clash Detection', 'Documentation'],
    keyModules: [
      'Architectural BIM Modeling — Create detailed building models using Revit Architecture.',
      'Structural Coordination — Understand structural models and coordinate elements with Revit Structure.',
      'MEP Awareness — Gain fundamental knowledge of MEP systems integration within BIM.',
      'Multi-Disciplinary Coordination — Coordinate Architecture, Structure, and MEP models effectively.',
      'Clash Detection — Identify and review design conflicts using Navisworks.',
      'BIM Documentation — Develop organized architectural drawings and project sheets.'
    ],
    careerPaths: ['Architectural BIM Modeler', 'Revit Architect', 'BIM Draftsman', 'Design Coordinator'],
    seoLocation: 'Best BIM for Architecture Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-mep-bim',
    title: 'MEP with BIM Engineering',
    discipline: 'MEP with BIM',
    category: 'MEP & Building Services',
    duration: '200 hours',
    tools: 'Revit Architecture (Base) · Revit Structure · Revit MEP · Navisworks',
    description: 'Coordinated modeling of HVAC, Electrical, Plumbing, and Fire Protection systems with architectural/structural alignment and automated clash detection.',
    img: '/images/courses/mep-with-bim.png',
    popularAreas: ['HVAC Ducting & Sizing', 'Electrical Lighting & Panels', 'Plumbing & Drainage', 'Fire Fighting Layouts', 'Clash Resolution', 'Multi-Discipline Coordination'],
    toolGroups: [
      { category: 'Revit Suite', tools: ['Revit Architecture (Base)', 'Revit Structure', 'Revit MEP'] },
      { category: 'Coordination & Review', tools: ['Navisworks Manage'] }
    ],
    workflow: ['Architectural / Structural Review', 'MEP 3D Modeling', 'Coordination', 'Clash Detection', 'Documentation', 'Coordination Sign-Off'],
    keyModules: [
      'Architectural & Structural Fundamentals — Understand building base elements in Revit Architecture (Base) and structural integration in Revit Structure.',
      'MEP Modeling — Develop coordinated HVAC, Plumbing, Fire Protection, and Electrical models using Revit MEP.',
      'BIM-Based Design — Understand BIM principles and apply them to real-world MEP projects.',
      'Interdisciplinary Coordination — Coordinate MEP systems with Architectural and Structural models.',
      'Clash Detection — Identify, analyze, and resolve MEP clashes using Navisworks.',
      'BIM Documentation — Prepare coordinated construction sheets, shop drawings, and schedules.'
    ],
    careerPaths: ['MEP BIM Engineer', 'HVAC Modeler', 'Plumbing Designer', 'Electrical BIM Coordinator', 'MEP Draftsman'],
    seoLocation: 'Best MEP with BIM Course in Perinthalmanna, Malappuram'
  },
  // Cross-listed under MEP with BIM: same programme as course-master-bim,
  // separate record + id so the category count, filter and modal all resolve.
  {
    id: 'course-mep-master-bim',
    title: 'Master Certificate in BIM',
    discipline: 'MEP with BIM',
    category: 'Master BIM Program',
    duration: '240 hours',
    tools: 'Revit (Arch/Struct/MEP) · Navisworks · BIM 360 · Dynamo · BIM Theory',
    description: 'Comprehensive Building Information Modeling program covering ISO 19650 standards, LOD 100-350 coordination, clash detection, CDE, and ACC workflows.',
    img: '/images/courses/bim-master-certificate.png',
    popularAreas: ['BIM Theory & Concepts', 'ISO 19650 Standards', 'LOD 100-350 Modeling', 'Multi-Discipline Coordination', 'Clash Detection', 'Dynamo Automation'],
    toolGroups: [
      { category: 'AutoCAD', tools: ['AutoCAD', 'AutoCAD Architecture'] },
      { category: 'Revit Suite', tools: ['Revit Architecture', 'Revit Structure', 'Revit MEP'] },
      { category: 'BIM Coordination & Collaboration', tools: ['Autodesk Construction Cloud (ACC / BIM 360)', 'Navisworks Manage', 'Dynamo', 'COBie', 'BIM Theory'] }
    ],
    workflow: ['BIM Concept & Standards', 'Schematic LOD 200', 'Detailed LOD 300', 'LOD 350 Coordination', 'Clash Resolution', 'CDE Management'],
    keyModules: [
      'BIM Theory & Fundamentals — Introduction to BIM principles, Industry 4.0 integration, and ISO 19650 international standards.',
      'Level of Information Need (LOIN) & LOD 100 Conceptual to LOD 200 Schematic Design.',
      'Engineering Drawing Fundamentals & 3D BIM Multi-Disciplinary Modeling.',
      'LOD 300 Detailed Modeling across Architectural, Structural, and MEP disciplines.',
      'LOD 350 BIM Coordination, clash detection, and conflict resolution in Navisworks.',
      'Common Data Environment (CDE) management and cloud collaboration with BIM 360 & ACC.'
    ],
    careerPaths: ['BIM Manager', 'BIM Coordinator', 'BIM Modeler', 'BIM Engineer', 'BIM Consultant'],
    seoLocation: 'Best Master Certificate in BIM Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-structural',
    title: 'Structural Design & Analysis',
    discipline: 'Structural Design',
    category: 'Structural Engineering',
    duration: '220 hours',
    tools: 'STAAD.Pro · ETABS · SAFE · Revit Structure · Tekla Structures',
    description: 'Complete structural design pipeline from load simulation (Dead/Live/Wind/Seismic), RCC & Steel analysis, foundation design to rebar fabrication detailing.',
    img: '/images/courses/structural-design-analysis.png',
    popularAreas: ['Seismic & Wind Analysis', 'RCC Building Design', 'Steel Trusses & Frames', 'Mat & Raft Foundations', 'Rebar Detailing', 'Tekla Fabrication'],
    toolGroups: [
      { category: 'Structural Analysis', tools: ['STAAD.Pro', 'ETABS', 'SAFE'] },
      { category: 'BIM & Detailing', tools: ['Revit Structure', 'Tekla Structures'] }
    ],
    workflow: ['Structural Modeling', 'Load & Analysis', 'Design & Optimization', 'Foundation Design', 'Tekla Detailing', 'Coordination'],
    keyModules: [
      'Structural Modeling — Develop structural models for buildings and infrastructure projects.',
      'Structural Analysis — Analyze structural behavior, loads, supports, forces, moments, and displacements.',
      'Reinforced Concrete & Steel Design — Apply practical RCC & structural steel design principles.',
      'Foundation Systems — Analyze and design isolated, combined, and mat/raft foundations using SAFE.',
      'Structural BIM — Create coordinated structural models and documentation using Revit Structure.',
      'Structural Detailing — Develop detailed fabrication and construction drawings using Tekla Structures.'
    ],
    careerPaths: ['Structural Design Engineer', 'RCC/Steel Detailer', 'Tekla Modeler', 'Structural Consultant', 'Site Structural Engineer'],
    seoLocation: 'Best Structural Design Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-ppm',
    title: 'Project Planning & Management (PPM)',
    discipline: 'Project Planning & Management',
    category: 'PPM & Project Controls',
    duration: '140 hours',
    tools: 'Primavera P6 · Microsoft Project (MS Project)',
    description: 'Master project scheduling, Work Breakdown Structure (WBS), resource leveling, critical path method (CPM), delay analysis, and executive project reporting.',
    img: '/images/courses/project-planning-management.png',
    popularAreas: ['WBS Breakdown', 'CPM Critical Path', 'Resource Allocation', 'Earned Value Analysis', 'Delay & Risk Analysis', 'Executive Reporting'],
    toolGroups: [
      { category: 'Enterprise PPM', tools: ['Primavera P6', 'Primavera Web'] },
      { category: 'Project Scheduling', tools: ['Microsoft Project (MS Project)', 'Gantt Charts'] }
    ],
    workflow: ['Project Setup', 'WBS & Scope', 'Activity Scheduling', 'Resource Allocation', 'Baseline', 'Progress Tracking', 'Delay Analysis', 'Reporting'],
    keyModules: [
      'Project Planning — Develop structured project plans based on scope, activities, resources, and timelines.',
      'WBS Development — Organize projects into manageable work packages and activities.',
      'Scheduling & Critical Path — Create, sequence, and manage project schedules with realistic CPM baselines.',
      'Resource Management — Plan and allocate manpower, materials, equipment, and project budgets.',
      'Progress Monitoring & Delay Analysis — Track planned vs. actual progress and evaluate delays.',
      'Project Reporting — Generate professional S-curves, progress reports, and executive updates.'
    ],
    careerPaths: ['Planning Engineer', 'Project Scheduler', 'Project Controls Specialist', 'PPM Consultant', 'Project Coordinator'],
    seoLocation: 'Best Project Planning and Management Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-survey',
    title: 'Surveying & Transportation Engineering',
    discipline: 'Surveying & Transportation',
    category: 'Civil & Infrastructure',
    duration: '180 hours',
    tools: 'AutoCAD · Autodesk Civil 3D · MicroStation',
    description: 'Transform field survey data into digital terrain models, road alignments, corridor profiles, cross-sections, and transportation infrastructure plans.',
    img: '/images/courses/surveying-transportation-engineering.png',
    popularAreas: ['Total Station Data', 'Digital Terrain Modeling', 'Road Alignment & Profiles', 'Corridor Modeling', 'Cross-Sections', 'Earthwork Quantities'],
    toolGroups: [
      { category: 'Civil Design', tools: ['Autodesk Civil 3D', 'AutoCAD Civil'] },
      { category: 'Infrastructure Drafting', tools: ['AutoCAD', 'MicroStation'] }
    ],
    workflow: ['Survey Data Processing', 'Topographic Mapping', 'Surface Modeling', 'Alignment & Profile', 'Road Corridor Design', 'Cross-Sections', 'Documentation'],
    keyModules: [
      'Surveying Fundamentals — Understand surveying measurements, coordinates, and total station field data.',
      'Survey Data Processing — Import, organize, and process survey points for engineering projects.',
      'Topographic Mapping & DTM — Create accurate topographic plans and digital terrain surface models.',
      'Civil 3D Workflows — Develop surfaces, alignments, profiles, corridors, and road cross-sections.',
      'Transportation Planning — Understand fundamentals of road geometry and corridor modeling.',
      'Engineering Documentation — Prepare professional plans, profiles, and construction deliverables.'
    ],
    careerPaths: ['Highway Design Engineer', 'Civil 3D Modeler', 'Survey Engineer', 'Infrastructure Draftsman', 'Transportation Planner'],
    seoLocation: 'Best Surveying and Transportation Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-product',
    title: 'Product Design & Engineering',
    discipline: 'Product Design',
    category: 'Mechanical Product Design',
    duration: '220 hours',
    tools: 'AutoCAD Mechanical · SolidWorks · Creo · CATIA',
    description: 'End-to-end 3D mechanical product development, feature-based parametric modeling, complex assemblies, sheet metal, and GD&T manufacturing documentation.',
    img: '/images/courses/product-design-engineering.png',
    popularAreas: ['Parametric Modeling', 'Complex Assemblies', 'Sheet Metal & Weldments', 'Surface Modeling', 'Mechanism Kinematics', 'GD&T Drawings'],
    toolGroups: [
      { category: 'Drafting', tools: ['AutoCAD', 'AutoCAD Mechanical'] },
      { category: '3D CAD & Modeling', tools: ['SolidWorks', 'Creo Parametric', 'CATIA'] }
    ],
    workflow: ['Concept Design', '2D Drafting', '3D Part Modeling', 'Assembly', 'Design Validation', 'Detailing', 'Manufacturing Documentation'],
    keyModules: [
      'Engineering Drawing — Create accurate 2D mechanical drawings and manufacturing documentation.',
      '3D Product Modeling — Develop detailed 3D parts, components, and assemblies.',
      'Parametric Workflows — Build flexible, editable models using industry-standard parametric constraints.',
      'Assembly Design — Create and manage multi-component assemblies and dynamic relationships.',
      'Mechanical Design Principles — Apply engineering principles for manufacturable product design.',
      'Design Optimization — Refine and optimize product designs for fabrication and production.'
    ],
    careerPaths: ['Product Design Engineer', 'Mechanical CAD Modeler', 'R&D Design Engineer', 'Tool & Die Designer', 'Manufacturing Draftsman'],
    seoLocation: 'Best Product Design Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-mech-cad',
    title: 'Mechanical CAD',
    discipline: 'Product Design',
    category: 'Mechanical Engineering',
    duration: '120 hours',
    tools: 'AutoCAD · AutoCAD Mechanical',
    description: 'Precision mechanical 2D drafting, machine component detailing, assembly drawings, bill of materials (BOM), and manufacturing CAD standards.',
    img: '/images/courses/mechanical-cad.png',
    popularAreas: ['Machine Component Drafting', 'Assembly Layouts', 'Sectional Views & Fits', 'BOM & Part Lists', 'Geometric Tolerances', 'Layer Standards'],
    toolGroups: [
      { category: 'Mechanical CAD', tools: ['AutoCAD', 'AutoCAD Mechanical'] }
    ],
    workflow: ['Engineering Concept', '2D Drafting', 'Component Design', 'Standard Contents', 'Assembly Drawing', 'Detailing', 'Manufacturing Output'],
    keyModules: [
      'Mechanical Drafting — Create accurate 2D mechanical drawings using industry drafting practices.',
      'Engineering Drawing — Master dimensions, tolerances, sections, projections, and annotations.',
      'Mechanical Components — Develop detailed drawings of machine parts and components.',
      'Assembly Drawings — Prepare assembly layouts, component details, and exploded views.',
      'CAD Standards — Apply professional layer, dimensioning, and annotation drawing standards.'
    ],
    careerPaths: ['Mechanical CAD Draftsman', 'Mechanical Designer', 'Fabrication Detailer', 'Production Assistant'],
    seoLocation: 'Best Mechanical CAD Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-civil-cad',
    title: 'AutoCAD Civil',
    discipline: 'Interior Design',
    category: 'Civil & Architectural Drafting',
    duration: '120 hours',
    tools: 'AutoCAD · AutoCAD Architecture',
    description: 'Comprehensive 2D architectural drafting, building permit drawings, floor plan layouts, elevation sections, construction documentation, and professional CAD standards.',
    img: '/images/courses/autocad-civil.png',
    popularAreas: ['2D Drafting', 'Architectural Documentation', 'Building Components', 'Site & Layout Drawings', 'Construction Documentation', 'CAD Standards'],
    toolGroups: [
      { category: 'Civil & Architectural Drafting', tools: ['AutoCAD', 'AutoCAD Architecture'] }
    ],
    workflow: ['Concept', '2D Drafting', 'Building Layout', 'Detailing', 'Documentation', 'Construction Drawing', 'K-Smart'],
    keyModules: [
      '2D Drafting — Create accurate technical drawings, plans, elevations, sections, and layouts.',
      'Architectural Documentation — Develop professional floor plans and detailed construction drawings.',
      'Building Components — Work with walls, doors, windows, stairs, spaces, and other building elements.',
      'Site & Layout Drawings — Prepare site plans, building layouts, and development drawings.',
      'Construction Documentation — Create clear and organized drawings for real-world construction requirements.',
      'CAD Standards — Apply professional layers, dimensions, annotations, symbols, and drawing standards.',
      'Drawing Efficiency — Use AutoCAD and AutoCAD Architecture tools to improve accuracy and productivity.'
    ],
    careerPaths: ['Civil CAD Draftsman', 'Architectural Draftsman', 'Building Plan Designer', 'Site Assistant'],
    seoLocation: 'Best Civil CAD Course in Perinthalmanna, Malappuram with 100% Placement Support'
  },
  {
    id: 'course-3dsmax',
    title: '3ds Max for Engineers & Architects',
    discipline: 'Interior Design',
    category: '3D Visualization',
    duration: '140 hours',
    tools: '3ds Max · V-Ray · Corona · Enscape · Forest Pack · Photoshop',
    description: 'High-end 3D architectural visualization, realistic PBR materials, advanced studio lighting, interior rendering, and post-production in Photoshop.',
    img: '/images/courses/3ds-max.png',
    popularAreas: ['Parametric Modeling', 'PBR Materials & Textures', 'V-Ray Day/Night Lighting', 'Corona Photorealism', 'Environment Scattering', 'Photoshop Post-Processing'],
    toolGroups: [
      { category: '3D Modeling & Rendering', tools: ['3ds Max', 'V-Ray', 'Corona Renderer'] },
      { category: 'Real-Time & Assets', tools: ['Enscape', 'Forest Pack', 'Chaos Cosmos', 'Adobe Photoshop'] }
    ],
    workflow: ['3D Modeling', 'Materials', 'Lighting', 'Rendering', 'Post-Production', 'Client Presentation'],
    keyModules: [
      '3D Modeling — Create detailed architectural and engineering models using 3ds Max.',
      'Material & Texture Creation — Apply realistic materials, textures, and architectural finishes.',
      'Lighting & Rendering — Produce high-quality photorealistic visuals using V-Ray and Corona.',
      'Real-Time Visualization — Create interactive walkthroughs and presentations using Enscape.',
      'Post-Production — Enhance renders and presentation visuals using Adobe Photoshop.'
    ],
    careerPaths: ['3D Architectural Visualizer', 'V-Ray Rendering Artist', 'CG Environment Artist', 'Interior Render Specialist'],
    seoLocation: 'Best 3ds Max Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-sketchup',
    title: 'SketchUp',
    discipline: 'Interior Design',
    category: '3D Modeling',
    duration: '100 hours',
    tools: 'SketchUp · V-Ray · Enscape · 1001bit Tools',
    description: 'Fast, intuitive 3D architectural modeling, interior space planning, 1001bit architectural tools, photorealistic V-Ray rendering, and live Enscape walkthroughs.',
    img: '/images/courses/sketchup.png',
    popularAreas: ['Space Planning & Layout', '1001bit Architecture Tools', 'V-Ray Rendering', 'Enscape Live Walkthrough', 'Landscape Assets', 'Client Presentation'],
    toolGroups: [
      { category: 'Modeling & Render', tools: ['SketchUp Pro', 'V-Ray for SketchUp', 'Enscape', '1001bit Tools'] }
    ],
    workflow: ['Concept', '3D Modeling', 'Materials', 'Lighting', 'Rendering', 'Walkthrough', 'Presentation'],
    keyModules: [
      '3D Modeling — Create detailed architectural and interior models using SketchUp.',
      'Architectural Design — Develop floor layouts, spaces, furniture, and building elements.',
      'Advanced Modeling — Improve modeling efficiency using 1001bit architectural tools.',
      'Photorealistic Rendering — Produce high-quality renders using V-Ray and live walkthroughs in Enscape.'
    ],
    careerPaths: ['SketchUp 3D Modeler', 'Interior Space Planner', 'Architectural Draftsman', 'Visualization Artist'],
    seoLocation: 'Best SketchUp Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-lumion',
    title: 'Lumion',
    discipline: 'Interior Design',
    category: 'Real-Time Render',
    duration: '80 hours',
    tools: 'Lumion · Real-Time Landscapes · Atmospheric Lighting · Animations',
    description: 'Transform CAD & BIM models into cinematic 4K video walkthroughs, realistic weather, foliage, volumetric sunlight, and immersive client presentations.',
    img: '/images/courses/lumion.png',
    popularAreas: ['Cinematic Video Walkthroughs', 'Atmospheric Weather & Skies', 'Foliage & Tree Animation', 'PBR Material Shaders', 'Photo & 4K Video Output', 'LiveSync CAD Integration'],
    toolGroups: [
      { category: 'Lumion Suite', tools: ['Lumion Pro', 'LiveSync Integration', 'Atmospheric Effects', 'Video Sequencing'] }
    ],
    workflow: ['3D Model Import', 'Materials', 'Landscape', 'Lighting & Atmosphere', 'Rendering', 'Animation Walkthrough'],
    keyModules: [
      '3D Visualization — Transform architectural models into immersive visual environments.',
      'Materials & Landscapes — Apply realistic materials and create detailed landscapes with vegetation.',
      'Lighting & Atmosphere — Develop realistic daylight, sunset, rain, fog, and environmental effects.',
      'Walkthrough & Animation — Create professional architectural animations and 4K photo renders.'
    ],
    careerPaths: ['Architectural Animation Artist', 'Lumion Visualizer', 'Presentation Specialist', 'Walkthrough Creator'],
    seoLocation: 'Best Lumion Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-revit-arch',
    title: 'Autodesk Revit Architecture',
    discipline: 'BIM [Building Information Modelling]',
    category: 'BIM Architectural',
    duration: '140 hours',
    tools: 'Revit Architecture · Parametric Families · BIM Documentation',
    description: 'Parametric BIM architectural design, walls, curtain systems, parametric custom families, automated schedules & quantity takeoff, and sheet sets.',
    img: '/images/courses/revit-architecture.png',
    popularAreas: ['Parametric Walls & Roofs', 'Custom Family Creation', 'Automated Schedules & QTO', 'Construction Sheet Sets', 'Phasing & Design Options', 'BIM Worksharing'],
    toolGroups: [
      { category: 'Revit Architecture', tools: ['Revit Architecture', 'Family Editor', 'BIM Schedules', 'Worksharing'] }
    ],
    workflow: ['Concept', 'BIM Modeling', 'Design Development', 'Documentation', 'Schedules', 'Construction Drawings'],
    keyModules: [
      'BIM Modeling — Create accurate 3D architectural models using Revit.',
      'Building Components — Model custom walls, floors, roofs, doors, windows, and stairs.',
      'Families & Components — Create and manage customized parametric Revit families.',
      'Construction Documentation — Generate coordinated plans, elevations, sections, and details.',
      'Schedules & Quantities — Extract quantities and cost estimates directly from the BIM model.'
    ],
    careerPaths: ['Revit Architectural Modeler', 'BIM Technician', 'Architectural Draftsman', 'Revit Family Specialist'],
    seoLocation: 'Best Revit Architecture Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-revit-struct',
    title: 'Autodesk Revit Structure',
    discipline: 'BIM [Building Information Modelling]',
    category: 'Structural BIM',
    duration: '140 hours',
    tools: 'Revit Structure · Reinforcement Detailing · Analytical Models',
    description: 'Parametric structural BIM modeling, concrete & steel framing, 3D reinforcement rebar detailing, bar bending schedules (BBS), and analytical coordination.',
    img: '/images/courses/revit-structure.png',
    popularAreas: ['Concrete Foundations & Columns', 'Structural Steel Framing', '3D Rebar Detailing', 'Bar Bending Schedules (BBS)', 'Analytical Model Export', 'BIM Coordination'],
    toolGroups: [
      { category: 'Revit Structure', tools: ['Revit Structure', 'Rebar Detailing', 'Analytical Link', 'Structural Schedules'] }
    ],
    workflow: ['Structural Design', 'BIM Modeling', 'Reinforcement', 'Documentation', 'Quantities', 'Coordination'],
    keyModules: [
      'Structural BIM Modeling — Create accurate 3D structural models for building projects.',
      'Structural Components — Model foundations, columns, beams, slabs, shear walls, and trusses.',
      'Reinforcement Detailing — Develop 3D reinforcement layouts and detailing for RCC elements.',
      'Structural Documentation — Generate coordinated structural plans, sections, and bar schedules.',
      'BIM Coordination — Coordinate structural models with architectural and MEP disciplines.'
    ],
    careerPaths: ['Structural BIM Modeler', 'Rebar Detailer', 'Structural Draftsman', 'BIM Structural Coordinator'],
    seoLocation: 'Best Revit Structure Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-revit-mep',
    title: 'Autodesk Revit MEP',
    discipline: 'BIM [Building Information Modelling]',
    category: 'BIM MEP Design',
    duration: '140 hours',
    tools: 'Revit MEP · HVAC · Electrical · Plumbing · Fire Protection',
    description: 'Design and model complex building services: HVAC ductwork, mechanical equipment, electrical power & lighting systems, piping, and clash avoidance.',
    img: '/images/courses/revit-mep.png',
    popularAreas: ['HVAC Duct Sizing & Routing', 'Electrical Circuits & Cable Trays', 'Domestic Water & Sanitary Piping', 'Fire Sprinkler Networks', 'MEP Family Creation', 'Clash Detection'],
    toolGroups: [
      { category: 'Revit MEP', tools: ['Revit MEP', 'HVAC Systems', 'Electrical Systems', 'Plumbing & Fire'] }
    ],
    workflow: ['MEP Design', 'BIM Modeling', 'System Development', 'Coordination', 'Documentation', 'Construction Drawings'],
    keyModules: [
      'MEP BIM Modeling — Create coordinated 3D models for HVAC, electrical, plumbing, and fire protection.',
      'HVAC Design — Develop ducts, equipment, air terminals, and mechanical systems.',
      'Electrical Design — Model electrical equipment, lighting, cable trays, and conduit layouts.',
      'Plumbing & Fire Protection — Create coordinated piping and sprinkler layouts.',
      'System Coordination — Coordinate MEP systems with architectural and structural models.'
    ],
    careerPaths: ['Revit MEP Modeler', 'HVAC Draftsman', 'Electrical BIM Modeler', 'Plumbing Designer'],
    seoLocation: 'Best Revit MEP Course in Perinthalmanna, Malappuram with 100% Placement Support'
  },
  {
    id: 'course-mep-revit-mep',
    title: 'Autodesk Revit MEP',
    discipline: 'MEP with BIM',
    category: 'MEP BIM Design',
    duration: '140 hours',
    tools: 'Revit MEP · HVAC · Electrical · Plumbing · Fire Protection',
    description: 'Design and model complex building services: HVAC ductwork, mechanical equipment, electrical power & lighting systems, piping, and clash avoidance.',
    img: '/images/courses/revit-mep.png',
    popularAreas: ['HVAC Duct Sizing & Routing', 'Electrical Circuits & Cable Trays', 'Domestic Water & Sanitary Piping', 'Fire Sprinkler Networks', 'MEP Family Creation', 'Clash Detection'],
    toolGroups: [
      { category: 'Revit MEP', tools: ['Revit MEP', 'HVAC Systems', 'Electrical Systems', 'Plumbing & Fire'] }
    ],
    workflow: ['MEP Design', 'BIM Modeling', 'System Development', 'Coordination', 'Documentation', 'Construction Drawings'],
    keyModules: [
      'MEP BIM Modeling — Create coordinated 3D models for HVAC, electrical, plumbing, and fire protection.',
      'HVAC Design — Develop ducts, equipment, air terminals, and mechanical systems.',
      'Electrical Design — Model electrical equipment, lighting, cable trays, and conduit layouts.',
      'Plumbing & Fire Protection — Create coordinated piping and sprinkler layouts.',
      'System Coordination — Coordinate MEP systems with architectural and structural models.'
    ],
    careerPaths: ['Revit MEP Modeler', 'HVAC Draftsman', 'Electrical BIM Modeler', 'Plumbing Designer'],
    seoLocation: 'Best Revit MEP Course in Perinthalmanna, Malappuram with 100% Placement Support'
  },
  {
    id: 'course-mep-revit-struct',
    title: 'Autodesk Revit Structure',
    discipline: 'MEP with BIM',
    category: 'Structural BIM for MEP',
    duration: '140 hours',
    tools: 'Revit Structure · Framing & Slabs · Penetration Detailing · BIM Coordination',
    description: 'Coordinate MEP building services with structural concrete, framing, wall/slab sleeve penetrations, and ensure clash-free structural integration.',
    img: '/images/courses/revit-structure.png',
    popularAreas: ['Structural Slab Openings', 'Beam Sleeve Penetrations', 'Shaft Coordination', 'Concrete Framing Support', 'MEP-Structural Interference', 'BIM Worksharing'],
    toolGroups: [
      { category: 'Revit Structure', tools: ['Revit Structure', 'Sleeve Detailing', 'Schedules', 'Coordination Link'] }
    ],
    workflow: ['Structural Review', 'MEP Clearance Check', 'Sleeve Modeling', 'Coordination', 'Documentation', 'Clash-Free Model'],
    keyModules: [
      'Structural Modeling — Model foundations, columns, beams, slabs, shear walls, and trusses.',
      'MEP Openings & Sleeves — Detail structural penetrations for HVAC ducts, pipes, and electrical trays.',
      'Multi-Disciplinary Coordination — Coordinate structural models with MEP services seamlessly.'
    ],
    careerPaths: ['BIM Structural Coordinator', 'MEP-Structural Modeler', 'BIM Coordinator'],
    seoLocation: 'Best Revit Structure for MEP Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-mep-navisworks',
    title: 'Autodesk Navisworks Manage',
    discipline: 'MEP with BIM',
    category: 'MEP Coordination',
    duration: '80 hours',
    tools: 'Navisworks Manage · Clash Detective · 4D Timeliner · Coordination Reports',
    description: 'Master multi-disciplinary BIM clash detection between MEP, Architectural, and Structural models, hard & soft clash analysis, and coordination issue tracking.',
    img: '/images/courses/navisworks-manage.png',
    popularAreas: ['MEP Clash Detection', 'Hard & Clearance Clashes', 'Clash Matrix Reports', '4D Construction Simulation', 'Model Federation', 'Issue Tracking'],
    toolGroups: [
      { category: 'Navisworks Manage', tools: ['Clash Detective', 'Timeliner 4D', 'Quantification', 'Clash Reports'] }
    ],
    workflow: ['Model Integration', 'Clash Matrix Setup', 'Clash Detection', 'Issue Reporting', 'Resolution Tracking', 'Sign-Off'],
    keyModules: [
      'Model Federation — Combine MEP, architectural, and structural models into a coordinated project.',
      'Clash Detection — Identify, analyze, and document clashes between pipes, ducts, trays, and structural members.',
      'Coordination Management — Generate clash reports and coordinate with engineering teams.'
    ],
    careerPaths: ['MEP BIM Coordinator', 'Clash Detection Specialist', 'BIM Coordination Engineer'],
    seoLocation: 'Best Navisworks MEP Coordination Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-navisworks',
    title: 'Autodesk Navisworks Manage',
    discipline: 'BIM [Building Information Modelling]',
    category: 'BIM Coordination & 4D',
    duration: '80 hours',
    tools: 'Navisworks Manage · Clash Detective · Timeliner 4D · Quantification',
    description: 'Multi-discipline federated model coordination, automated hard & clearance clash detection, 4D construction schedule simulation with Gantt charts, and QTO.',
    img: '/images/courses/navisworks-manage.png',
    popularAreas: ['Federated Model Merging', 'Clash Detective & Rules', 'Clash Matrix Reporting', 'Timeliner 4D Scheduling', 'Quantity Takeoff (QTO)', 'Redline Model Review'],
    toolGroups: [
      { category: 'Navisworks Manage', tools: ['Clash Detective', 'Timeliner 4D', 'Quantification', 'Clash Reports'] }
    ],
    workflow: ['Model Integration', 'Model Review', 'Clash Detection', 'Clash Resolution', '4D Simulation', 'Coordination Reporting'],
    keyModules: [
      'Model Coordination — Combine architectural, structural, and MEP models into a coordinated project.',
      'Clash Detection — Identify and analyze clashes between different building systems.',
      'Clash Management — Review, organize, track, and communicate coordination issues.',
      '4D Construction Simulation — Link project schedules with 3D models to visualize construction sequencing.',
      'Quantification — Extract model-based quantities for project planning and cost estimation.'
    ],
    careerPaths: ['BIM Coordinator', 'Clash Detection Specialist', '4D Simulation Engineer', 'BIM Reviewer'],
    seoLocation: 'Best Navisworks Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-staadpro',
    title: 'STAAD.Pro',
    discipline: 'Structural Design',
    category: 'Structural Analysis',
    duration: '100 hours',
    tools: 'STAAD.Pro · IS 456 / IS 800 · Foundation Design · Wind & Seismic',
    description: 'Perform linear & non-linear finite element analysis, space frame modeling, wind and earthquake load definitions, concrete & steel design optimization.',
    img: '/images/courses/staad-pro.png',
    popularAreas: ['Space Frame Modeling', 'IS Code Load Calculations', 'Static & Dynamic Seismic Analysis', 'Concrete Beam/Column Design', 'Steel Truss Design', 'Isolated & Combined Footing'],
    toolGroups: [
      { category: 'STAAD.Pro', tools: ['STAAD.Pro Connect Edition', 'STAAD Foundation Advanced', 'Steel & RCC Designer'] }
    ],
    workflow: ['Structural Modeling', 'Load Definition', 'Analysis', 'Design', 'Optimization', 'Verification & Reporting'],
    keyModules: [
      'Structural Modeling — Create analytical models of buildings, industrial plants, and structural frames.',
      'Load Definition — Apply dead, live, wind, seismic, and other relevant design loads per codes.',
      'Structural Analysis — Analyze structural behavior, reactions, forces, moments, and deflections.',
      'Steel & Concrete Design — Design and check members according to applicable building standards.',
      'Foundation Design — Develop structural foundation designs based on soil bearing capacities.'
    ],
    careerPaths: ['Structural Analysis Engineer', 'Structural Design Consultant', 'Civil Project Engineer'],
    seoLocation: 'Best STAAD.Pro Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-etabs',
    title: 'ETABS',
    discipline: 'Structural Design',
    category: 'Structural Engineering',
    duration: '100 hours',
    tools: 'ETABS · High-Rise Modeling · Response Spectrum · Shear Walls',
    description: 'Specialized 3D analysis and design of multi-storey residential & commercial towers, response spectrum seismic analysis, wind drift checks, and shear wall design.',
    img: '/images/courses/etabs.png',
    popularAreas: ['Multi-Storey Tower Modeling', 'Response Spectrum Seismic', 'Wind Tunnel Loads', 'Concrete Core & Shear Walls', 'P-Delta Secondary Effects', 'Design Reports'],
    toolGroups: [
      { category: 'ETABS Suite', tools: ['ETABS Nonlinear', 'Shear Wall Designer', 'Seismic & Wind Engine'] }
    ],
    workflow: ['Building Modeling', 'Load Definition', 'Analysis', 'Design', 'Optimization', 'Documentation'],
    keyModules: [
      'Building Modeling — Develop accurate analytical models of multi-storey building structures.',
      'Load Definition — Apply dead, live, wind, seismic, and combined lateral loads.',
      'Structural Analysis — Evaluate forces, moments, reactions, drifts, and overall building behavior.',
      'RCC Design — Analyze and design beams, columns, slabs, and shear walls.',
      'Seismic & Wind Optimization — Review analysis results and optimize member sections for performance.'
    ],
    careerPaths: ['High-Rise Structural Engineer', 'Building Design Consultant', 'RCC Structural Modeler'],
    seoLocation: 'Best ETABS Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-tekla',
    title: 'Tekla',
    discipline: 'Structural Design',
    category: 'Structural BIM & Detailing',
    duration: '120 hours',
    tools: 'Tekla Structures · Steel Detailing · RCC Detailing · Shop Drawings',
    description: 'Constructible 3D structural steel and cast-in-place rebar detailing, custom connection joints, automated fabrication shop drawings, and CNC export.',
    img: '/images/courses/tekla.png',
    popularAreas: ['Structural Steel Detailing', 'Connection Plates & Bolts', 'Cast-In-Place Concrete Rebar', 'Automated Shop Drawings', 'Assembly Part Lists', 'NC/CNC Machine Export'],
    toolGroups: [
      { category: 'Tekla Structures', tools: ['Tekla Structures Steel', 'Tekla Concrete', 'Drawing Manager'] }
    ],
    workflow: ['Structural Design', '3D BIM Modeling', 'Detailing', 'Connections', 'Reinforcement', 'Shop Drawings', 'Fabrication Output'],
    keyModules: [
      'Structural BIM Modeling — Create detailed 3D models of steel and reinforced concrete structures.',
      'Steel Detailing — Model steel members, connections, base plates, bolts, and structural joints.',
      'RCC Detailing — Develop 3D reinforcement models and automated rebar schedules.',
      'Fabrication Drawings — Generate accurate shop and erection drawings directly from the model.',
      'Quantity Takeoff — Extract material weights, surface areas, and quantities for fabrication.'
    ],
    careerPaths: ['Tekla Steel Detailer', 'Structural Rebar Modeler', 'Fabrication Draftsman', 'BIM Structural Modeler'],
    seoLocation: 'Best Tekla Structures Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-safe',
    title: 'SAFE',
    discipline: 'Structural Design',
    category: 'Structural & Foundation',
    duration: '80 hours',
    tools: 'SAFE · Post-Tensioned Slabs · Mat Foundations · Punching Shear',
    description: 'Specialized analysis and design of concrete floor slabs, flat slab systems with drop panels, punching shear checks, and mat/raft foundation systems.',
    img: '/images/courses/safe.png',
    popularAreas: ['Flat Slab Design', 'Punching Shear Verification', 'Mat / Raft Foundation Design', 'Soil-Structure Interaction', 'Flexural Reinforcement', 'Deflection Limits'],
    toolGroups: [
      { category: 'SAFE', tools: ['CSI SAFE', 'Slab Designer', 'Raft Foundation Engine'] }
    ],
    workflow: ['Structural Modeling', 'Load Definition', 'Analysis', 'Design', 'Reinforcement', 'Verification & Documentation'],
    keyModules: [
      'Structural Modeling — Create analytical models for slabs and foundation systems.',
      'Slab Analysis & Design — Analyze and design reinforced concrete slabs for strength and serviceability.',
      'Flat Slab Design — Evaluate flat slab systems, including punching shear and reinforcement requirements.',
      'Foundation Design — Model and design isolated, combined, and mat/raft foundation systems.',
      'Design Verification — Review forces, stresses, deflections, and reinforcement calculations.'
    ],
    careerPaths: ['Foundation Design Engineer', 'Slab Structural Specialist', 'Civil Design Engineer'],
    seoLocation: 'Best SAFE Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-struct-revit',
    title: 'Autodesk Revit Structure',
    discipline: 'Structural Design',
    category: 'Structural BIM & Detailing',
    duration: '140 hours',
    tools: 'Revit Structure · Reinforcement Detailing · Analytical Models',
    description: 'Parametric structural BIM modeling, concrete & steel framing, 3D reinforcement rebar detailing, bar bending schedules (BBS), and analytical coordination.',
    img: '/images/courses/revit-structure.png',
    popularAreas: ['Concrete Foundations & Columns', 'Structural Steel Framing', '3D Rebar Detailing', 'Bar Bending Schedules (BBS)', 'Analytical Model Export', 'BIM Coordination'],
    toolGroups: [
      { category: 'Revit Structure', tools: ['Revit Structure', 'Rebar Detailing', 'Analytical Link', 'Structural Schedules'] }
    ],
    workflow: ['Structural Design', 'BIM Modeling', 'Reinforcement', 'Documentation', 'Quantities', 'Coordination'],
    keyModules: [
      'Structural BIM Modeling — Create accurate 3D structural models for building projects.',
      'Structural Components — Model foundations, columns, beams, slabs, shear walls, and trusses.',
      'Reinforcement Detailing — Develop 3D reinforcement layouts and detailing for RCC elements.',
      'Structural Documentation — Generate coordinated structural plans, sections, and bar schedules.',
      'BIM Coordination — Coordinate structural models with architectural and MEP disciplines.'
    ],
    careerPaths: ['Structural BIM Modeler', 'Rebar Detailer', 'Structural Draftsman', 'BIM Structural Coordinator'],
    seoLocation: 'Best Revit Structure Course in Perinthalmanna, Malappuram with 100% Placement Support'
  },
  {
    id: 'course-solidworks',
    title: 'SolidWorks',
    discipline: 'Product Design',
    category: '3D Mechanical Design',
    duration: '140 hours',
    tools: 'SolidWorks · Parametric Parts · Assemblies · Sheet Metal · Weldments',
    description: 'Parametric 3D mechanical part modeling, complex multi-body assemblies, sheet metal enclosures, structural weldment frames, and manufacturing drawings.',
    img: '/images/courses/solidworks.png',
    popularAreas: ['Parametric Part Modeling', 'Assembly Mates & Relations', 'Sheet Metal Bends & Flat Patterns', 'Structural Weldments', 'Surface Modeling', 'GD&T 2D Drawings'],
    toolGroups: [
      { category: 'SolidWorks', tools: ['Solid Modeling', 'Surface Modeling', 'Assembling', 'FEA', 'Sheet Metal', 'Weldments', 'Drafting & Detailing'] }
    ],
    workflow: ['Concept', '3D Part Modeling', 'Assembly', 'Design Development', 'Detailing', 'Manufacturing Documentation'],
    keyModules: [
      '3D Part Modeling — Create accurate parametric 3D models of mechanical components.',
      'Assembly Design — Develop and manage multi-component assemblies and dynamic relationships.',
      'Sheet Metal Design — Create sheet metal parts, bend allowances, and fabrication-ready flat patterns.',
      'Weldment Design — Create structural frames and welded assemblies using standard structural shapes.',
      'Manufacturing Documentation — Prepare professional drawings with dimensions, tolerances, and BOM.'
    ],
    careerPaths: ['SolidWorks Design Engineer', 'Mechanical CAD Modeler', 'Product Development Engineer', 'Drafting Specialist'],
    seoLocation: 'Best SolidWorks Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-creo',
    title: 'Creo Parametric',
    discipline: 'Product Design',
    category: 'Product Design & Engineering',
    duration: '120 hours',
    tools: 'Creo Parametric · Part Design · Assemblies · Mechanism Design',
    description: 'High-end parametric CAD modeling for consumer products and automotive machinery, mechanism kinematics, complex surfaces, and GD&T drawings.',
    img: '/images/courses/creo-parametric.png',
    popularAreas: ['Feature-Based Part Design', 'Parametric Constraints', 'Complex Assembly Management', 'Mechanism Kinematics', 'Advanced Surface Modeling', 'Manufacturing Drawings'],
    toolGroups: [
      { category: 'Creo Suite', tools: ['Creo Parametric', 'Mechanism Design', 'Sheet Metal', 'Drawing & Detailing', 'Design Automation'] }
    ],
    workflow: ['Concept', 'Parametric Modeling', 'Part Design', 'Assembly', 'Design Validation', 'Detailing', 'Manufacturing Output'],
    keyModules: [
      'Parametric 3D Modeling — Create accurate, flexible, and fully parametric product models.',
      'Part Design — Develop detailed mechanical components using feature-based solid modeling.',
      'Assembly Design — Build and manage complex product assemblies and component relationships.',
      'Mechanism Design — Understand component movement, degrees of freedom, and mechanical kinematics.',
      'Engineering Drawings — Generate detailed 2D drawings with dimensions, tolerances, and annotations.'
    ],
    careerPaths: ['Creo CAD Engineer', 'Mechanical R&D Engineer', 'Automotive CAD Modeler', 'Parametric Tool Designer'],
    seoLocation: 'Best Creo Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-primavera',
    title: 'Oracle Primavera P6 Professional',
    discipline: 'Project Planning & Management',
    category: 'Project Planning & Scheduling',
    duration: '100 hours',
    tools: 'Primavera P6 · WBS · CPM Scheduling · Resource Leveling · Baselines',
    description: 'Enterprise project planning, creating Work Breakdown Structures (WBS), defining activity relationships, resource & cost management, and S-curve reports.',
    img: '/images/courses/primavera-p6.png',
    popularAreas: ['Enterprise Project Structure (EPS)', 'Work Breakdown Structure (WBS)', 'Critical Path Method (CPM)', 'Resource & Cost Loading', 'Baseline Tracking', 'Delay Analysis & S-Curves'],
    toolGroups: [
      { category: 'Primavera P6', tools: ['Primavera P6 Professional', 'Resource Management', 'Progress Tracking', 'Report Wizard'] }
    ],
    workflow: ['Project Setup', 'WBS', 'Activities', 'Relationships', 'Resources', 'Baseline', 'Progress Updating', 'Delay Analysis', 'Reporting'],
    keyModules: [
      'Project Planning — Develop structured project plans based on scope, activities, resources, and milestones.',
      'WBS Development — Create a clear Work Breakdown Structure to organize complex projects.',
      'Activity Scheduling — Define activities, durations, dependencies, and critical path baselines.',
      'Resource Management — Plan, allocate, and level manpower, materials, equipment, and project budgets.',
      'Progress Monitoring & Delay Analysis — Track performance, identify delays, and adjust schedules.',
      'Project Reporting — Prepare professional schedules, earned value reports, and management updates.'
    ],
    careerPaths: ['Primavera Planning Engineer', 'Project Scheduler', 'Project Controls Specialist', 'PPM Consultant'],
    seoLocation: 'Best Primavera P6 Course in Perinthalmanna, Malappuram'
  },
  {
    id: 'course-msproject',
    title: 'Microsoft Project (MS Project)',
    discipline: 'Project Planning & Management',
    category: 'Project Management & Planning',
    duration: '80 hours',
    tools: 'MS Project · Gantt Charts · WBS · Critical Path · Resource Allocation',
    description: 'Essential project management with Microsoft Project: task scheduling, Gantt chart visualization, resource allocation, baseline tracking, and progress reporting.',
    img: '/images/courses/ms-project.png',
    popularAreas: ['Gantt Chart Management', 'WBS Task Hierarchy', 'Resource Allocation & Leveling', 'Critical Path Analysis', 'Baseline Comparison', 'Project Status Reports'],
    toolGroups: [
      { category: 'Microsoft Project', tools: ['MS Project Standard', 'Gantt Views', 'Resource Sheet', 'Report Dashboard'] }
    ],
    workflow: ['Project Setup', 'WBS', 'Task Scheduling', 'Dependencies', 'Resource Allocation', 'Baseline', 'Progress Tracking', 'Reporting'],
    keyModules: [
      'Project Planning — Create structured project plans with activities, milestones, and realistic timelines.',
      'WBS Development — Organize projects into manageable tasks and work packages.',
      'Gantt Chart Management — Visualize project schedules, timelines, dependencies, and progress.',
      'Resource Management — Plan and allocate manpower, materials, equipment, and other resources.',
      'Critical Path & Baselines — Identify critical activities and compare planned schedules with actual performance.'
    ],
    careerPaths: ['Project Coordinator', 'MS Project Scheduler', 'Project Management Executive', 'Assistant Planning Engineer'],
    seoLocation: 'Best Microsoft Project Course in Perinthalmanna, Malappuram'
  },
  // ==========================================
  // SURVEYING & TRANSPORTATION (Dummy Content)
  // ==========================================
  {
    id: 'course-survey-civil-cadd',
    title: 'Civil CADD',
    discipline: 'Surveying & Transportation',
    category: 'Civil Drafting & Planning',
    duration: '120 hours',
    tools: 'AutoCAD · AutoCAD Civil · Land Development · Site Drafting',
    description: 'Comprehensive 2D civil drafting, site layouts, topographic boundary plans, subdivision plotting, road cross-sections, and municipal infrastructure drawings.',
    img: '/images/courses/autocad-civil.png',
    popularAreas: ['Site Layout Plans', 'Topographic Boundary Mapping', 'Road Cross-Sections', 'Subdivision Plotting', 'Municipal Infrastructure', 'CAD Layer Standards'],
    toolGroups: [
      { category: 'Civil CAD', tools: ['AutoCAD Civil', 'AutoCAD Architecture', 'Drafting Tools'] }
    ],
    workflow: ['Field Data Import', 'Boundary Layout', 'Site Planning', 'Section Drafting', 'Infrastructure Deliverable', 'Final Plotting'],
    keyModules: [
      '2D Civil Drafting — Accurate technical drafting for land development and civil engineering projects.',
      'Site Layout & Boundaries — Developing property lines, building footprints, and setback boundaries.',
      'Infrastructure Documentation — Preparing detailed civil utility, drainage, and road layout drawings.'
    ],
    careerPaths: ['Civil CAD Drafter', 'Land Development Technician', 'Site Plan Drafter', 'Survey Assistant'],
    seoLocation: 'Best Civil CADD Course in Perinthalmanna, Malappuram with 100% Placement Support'
  },
  {
    id: 'course-survey-civil3d',
    title: 'AutoCAD Civil 3D',
    discipline: 'Surveying & Transportation',
    category: 'Civil 3D & Design',
    duration: '140 hours',
    tools: 'AutoCAD Civil 3D · Survey Data Processing · Terrain Modeling · Corridor Design',
    description: 'Master Civil 3D for land development, survey data processing, surface & terrain modeling, road corridor design, grading, pipe networks, and construction documentation.',
    img: '/images/courses/autocad-civil-3d.png',
    popularAreas: ['Surveying & Survey Data Processing', 'Surface & Terrain Modeling', 'Alignment & Profile Design', 'Road & Corridor Design', 'Grading & Site Development', 'Pipe Networks & Utility Design', 'Quantity Takeoff & Civil Documentation'],
    toolGroups: [
      {
        category: 'Civil Engineering Design & Infrastructure Workflows',
        tools: [
          'AutoCAD Civil 3D',
          'Surveying & Survey Data Processing',
          'Surface & Terrain Modeling',
          'Alignment & Profile Design',
          'Road & Corridor Design',
          'Grading & Site Development',
          'Pipe Networks & Utility Design',
          'Quantity Takeoff & Civil Documentation'
        ]
      }
    ],
    workflow: ['Survey Data', 'Surface Creation', 'Alignment Design', 'Profile Design', 'Corridor Modeling', 'Grading', 'Pipe Networks', 'Quantity Takeoff', 'Construction Documentation'],
    keyModules: [
      'Civil 3D Fundamentals — Understand the Civil 3D interface, styles, templates, objects, and essential civil engineering workflows.',
      'Survey Data Processing — Import, manage, and process survey data to develop accurate digital site information.',
      'Surface & Terrain Modeling — Create and edit existing ground surfaces, contours, and digital terrain models.',
      'Alignment Design — Create horizontal alignments for roads, highways, and other infrastructure projects.',
      'Profile & Profile View — Develop vertical profiles and analyze existing and proposed ground levels.',
      'Road & Corridor Design — Create assemblies and corridors for detailed road and infrastructure modeling.',
      'Grading & Site Development — Develop grading plans, finished ground levels, and site development designs.',
      'Pipe Networks — Create and manage stormwater, drainage, and utility networks using Civil 3D tools.',
      'Quantity Takeoff — Extract quantities and prepare accurate project information for planning and estimation.',
      'Civil Engineering Documentation — Generate plan, profile, section, and construction drawings using professional CAD standards.'
    ],
    careerPaths: ['Civil 3D Modeler', 'Highway Design Engineer', 'Infrastructure CAD Specialist', 'Corridor Designer', 'Site Development Engineer'],
    seoLocation: 'Best Civil 3D Course in Perinthalmanna, Malappuram: Key Learning Outcomes & Workflows'
  },
  {
    id: 'course-survey-microstation',
    title: 'MicroStation',
    discipline: 'Surveying & Transportation',
    category: 'MicroStation Design',
    duration: '120 hours',
    tools: 'MicroStation · 2D Engineering Drafting · Survey & Mapping · Road & Highway Design',
    description: 'Learn Bentley MicroStation for civil engineering drafting, surveying, topographic mapping, road & highway design, site development, geometric design, and infrastructure documentation.',
    img: '/images/courses/microstation.png',
    popularAreas: ['2D Engineering Drafting', 'Survey & Mapping', 'Road & Highway Design', 'Site Development', 'Geometric Design', 'Terrain & Topographic Mapping', 'Infrastructure Documentation'],
    toolGroups: [
      {
        category: 'Civil Engineering & Infrastructure Design',
        tools: [
          'MicroStation',
          '2D Engineering Drafting',
          'Survey & Mapping',
          'Road & Highway Design',
          'Site Development',
          'Geometric Design',
          'Terrain & Topographic Mapping',
          'Infrastructure Documentation'
        ]
      }
    ],
    workflow: ['Survey Data', 'Base Mapping', 'Site Analysis', 'Alignment & Profile', 'Road & Site Design', 'Detailing', 'Documentation', 'Construction Drawings'],
    keyModules: [
      '2D Engineering Drafting — Create accurate plans, layouts, sections, elevations, and detailed engineering drawings.',
      'Survey & Mapping — Process survey information and develop accurate mapping and engineering drawings.',
      'Topographic Mapping — Prepare topographic plans and represent existing site conditions.',
      'Road & Highway Design — Develop road layouts, alignments, profiles, and related infrastructure drawings.',
      'Site Development — Prepare site layouts, grading concepts, and development drawings.',
      'Geometric Design — Understand and develop horizontal and vertical geometric elements for transportation projects.',
      'Engineering Documentation — Produce organized plan, profile, section, and construction drawings using professional CAD standards.',
      'Drawing Efficiency — Use MicroStation tools and workflows to improve drafting accuracy, productivity, and project coordination.'
    ],
    careerPaths: ['MicroStation Draftsman', 'Infrastructure Designer', 'Transportation CAD Engineer', 'Highway Detailer', 'Civil Technician'],
    seoLocation: 'Best MicroStation Course in Perinthalmanna, Malappuram: Key Learning Outcomes & Workflows'
  },
  // ==========================================
  // AutoCAD
  // ==========================================
  {
    id: 'course-cadd-civil',
    title: 'AutoCAD Civil',
    discipline: 'AutoCAD',
    category: 'Civil & Architectural Drafting',
    duration: '120 hours',
    tools: 'AutoCAD · AutoCAD Architecture',
    description: 'Master 2D drafting, architectural floor plans, building components, site layout drawings, construction documentation, and professional CAD standards.',
    img: '/images/courses/autocad-civil.png',
    popularAreas: ['2D Drafting', 'Architectural Documentation', 'Building Components', 'Site & Layout Drawings', 'Construction Documentation', 'CAD Standards'],
    toolGroups: [
      { category: 'Civil & Architectural Drafting', tools: ['AutoCAD', 'AutoCAD Architecture'] }
    ],
    workflow: ['Concept', '2D Drafting', 'Building Layout', 'Detailing', 'Documentation', 'Construction Drawing', 'K-Smart'],
    keyModules: [
      '2D Drafting — Create accurate technical drawings, plans, elevations, sections, and layouts.',
      'Architectural Documentation — Develop professional floor plans and detailed construction drawings.',
      'Building Components — Work with walls, doors, windows, stairs, spaces, and other building elements.',
      'Site & Layout Drawings — Prepare site plans, building layouts, and development drawings.',
      'Construction Documentation — Create clear and organized drawings for real-world construction requirements.',
      'CAD Standards — Apply professional layers, dimensions, annotations, symbols, and drawing standards.',
      'Drawing Efficiency — Use AutoCAD and AutoCAD Architecture tools to improve accuracy and productivity.'
    ],
    careerPaths: ['Civil CAD Draftsman', 'Architectural Draftsman', 'Building Plan Designer', 'Site Assistant'],
    seoLocation: 'Best Civil CAD Course in Perinthalmanna, Malappuram with 100% Placement Support'
  },
  {
    id: 'course-cadd-mechanical',
    title: 'AutoCAD Mechanical',
    discipline: 'AutoCAD',
    category: 'Mechanical Drafting & Design',
    duration: '120 hours',
    tools: 'AutoCAD · AutoCAD Mechanical',
    description: 'Master 2D mechanical drafting, engineering drawing dimensions & tolerances, machine component design, assembly layouts, and manufacturing documentation.',
    img: '/images/courses/mechanical-cad.png',
    popularAreas: ['Mechanical Drafting', 'Engineering Drawing', 'Mechanical Components', 'Assembly Drawings', 'Manufacturing Documentation', 'CAD Standards'],
    toolGroups: [
      { category: 'Mechanical Drafting & Design', tools: ['AutoCAD', 'AutoCAD Mechanical'] }
    ],
    workflow: ['Engineering Concept', '2D Drafting', 'Component Design', 'Standard Contents', 'Assembly Drawing', 'Detailing', 'Manufacturing Documentation'],
    keyModules: [
      'Mechanical Drafting — Create accurate 2D mechanical drawings using industry-standard drafting practices.',
      'Engineering Drawing — Understand dimensions, tolerances, sections, projections, and technical annotations.',
      'Mechanical Components — Develop detailed drawings of machine parts and mechanical components.',
      'Assembly Drawings — Prepare assembly layouts, component details, and exploded views.',
      'Manufacturing Documentation — Create clear and precise drawings suitable for fabrication and manufacturing.',
      'CAD Standards — Apply professional layer, dimensioning, annotation, and drawing standards.',
      'Design Productivity — Use AutoCAD Mechanical tools and libraries to improve drafting efficiency.'
    ],
    careerPaths: ['Mechanical CAD Draftsman', 'Mechanical Designer', 'Fabrication Detailer', 'Production Assistant'],
    seoLocation: 'Best Mechanical CAD Course in Perinthalmanna, Malappuram with 100% Placement Support'
  },
  {
    id: 'course-cadd-electrical',
    title: 'AutoCAD Electrical',
    discipline: 'AutoCAD',
    category: 'Electrical Drafting & Design',
    duration: '120 hours',
    tools: 'AutoCAD · AutoCAD Electrical',
    description: 'Master electrical schematics, single-line diagrams, control panel layouts, standardized component libraries, circuit wiring, and multi-disciplinary CAD coordination.',
    img: '/images/courses/autocad-electrical.jpg',
    popularAreas: ['Electrical Drafting', 'Single Line Diagrams (SLD)', 'Control Panel Design', 'Component Libraries', 'Circuit & Wiring Design', 'CAD Standards'],
    toolGroups: [
      { category: 'Electrical Drafting & Design', tools: ['AutoCAD', 'AutoCAD Electrical'] }
    ],
    workflow: ['Electrical Concept', 'Schematic Design', 'Circuit & Wiring', 'Panel Design', 'Layout', 'Documentation', 'Coordination'],
    keyModules: [
      'Electrical Drafting — Create accurate and professional electrical drawings using industry-standard CAD tools.',
      'Electrical Schematics — Develop single-line diagrams, circuit diagrams, control circuits, and wiring layouts.',
      'Electrical Documentation — Prepare detailed electrical plans, layouts, schedules, and documentation.',
      'Panel & Control Design — Create electrical control panel drawings and documentation.',
      'Electrical Components — Work with standardized symbols, component libraries, and electrical databases.',
      'Circuit & Wiring Design — Develop clear and coordinated wiring and connection diagrams.',
      'CAD Standards — Apply professional drafting, annotation, layering, and documentation standards.',
      'Design Coordination — Coordinate electrical drawings with architectural, mechanical, and structural requirements.'
    ],
    careerPaths: ['Electrical CAD Engineer', 'Control Panel Designer', 'Electrical Draftsman', 'Substation Detailer'],
    seoLocation: 'Best Electrical CAD Course in Perinthalmanna, Malappuram with 100% Placement Support'
  }
];

// Discipline groups, in the order they are presented to a visitor. Derived from the
// `discipline` key on each course above so the grid can never drift from the catalogue.
const DISCIPLINE_ORDER = [
  'AutoCAD',
  'Interior Design',
  'BIM [Building Information Modelling]',
  'MEP with BIM',
  'Product Design',
  'Structural Design',
  'Surveying & Transportation',
  'Project Planning & Management'
];

// Short chip labels for the filter row; falls back to the full name when unmapped.
const DISCIPLINE_SHORT = {
  'Interior Design': 'Interior Design',
  'BIM [Building Information Modelling]': 'BIM [Building Information Modelling]',
  'MEP with BIM': 'MEP with BIM',
  'Product Design': 'Product Design',
  'Structural Design': 'Structural Design',
  'Surveying & Transportation': 'Surveying & Transportation',
  'Project Planning & Management': 'Project Planning & Management',
  'AutoCAD': 'AutoCAD'
};

const COURSES_BY_DISCIPLINE = DISCIPLINE_ORDER.map((name) => ({
  name,
  shortName: DISCIPLINE_SHORT[name] || name,
  courses: ALL_COURSES.filter((c) => c.discipline === name)
})).filter((g) => g.courses.length > 0);

// ---------------------------------------------------------------------------
// URL <-> catalogue mapping
//
// A course detail sheet is a real place, so it gets a real address:
//   /courses                                  the catalogue
//   /courses/mep-with-bim                     one discipline selected
//   /courses/mep-with-bim/autodesk-revit-mep  that course's sheet open
//
// The address is what drives the sheet, so back/forward, the iOS left-edge
// swipe, a refresh and a pasted deep link all land in the same state. Railway
// serves the app with `serve -s`, which rewrites unknown paths to index.html,
// so these URLs survive a hard reload.
// ---------------------------------------------------------------------------
const DISCIPLINE_SLUG = {
  'AutoCAD': 'autocad',
  'Interior Design': 'interior-design',
  'BIM [Building Information Modelling]': 'bim',
  'MEP with BIM': 'mep-with-bim',
  'Product Design': 'product-design',
  'Structural Design': 'structural-design',
  'Surveying & Transportation': 'surveying-transportation',
  'Project Planning & Management': 'project-planning-management'
};

const SLUG_TO_DISCIPLINE = Object.fromEntries(
  Object.entries(DISCIPLINE_SLUG).map(([name, slug]) => [slug, name])
);

const courseSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const disciplinePath = (name) =>
  name === 'all' ? '/courses' : `/courses/${DISCIPLINE_SLUG[name]}`;

const coursePath = (course) =>
  `/courses/${DISCIPLINE_SLUG[course.discipline]}/${courseSlug(course.title)}`;

// The same title is cross-listed under more than one discipline (Revit MEP,
// Master Certificate in BIM…), so the discipline segment is what disambiguates.
function readLocation(pathname) {
  const match = pathname.replace(/\/+$/, '').match(/^\/courses(?:\/([^/]+))?(?:\/([^/]+))?$/);
  if (!match) return { inCatalogue: false, discipline: 'all', course: null };

  const discipline = match[1] ? SLUG_TO_DISCIPLINE[match[1]] || 'all' : 'all';
  const course = match[2]
    ? ALL_COURSES.find(
      (c) => c.discipline === discipline && courseSlug(c.title) === match[2]
    ) || null
    : null;

  return { inCatalogue: true, discipline, course };
}

// Compact course tile. The course NAME is the primary element; the photograph is a
// backdrop, not the content. Sized so a full row of courses is scannable at a glance.
function CourseTile({ item, onSelectCourse }) {
  return (
    <button
      type="button"
      onClick={() => onSelectCourse(item)}
      aria-label={`${item.title} — view syllabus`}
      className="group relative block w-full h-[132px] sm:h-[164px] rounded-[12px] overflow-hidden border border-white/10 bg-[#171A20] text-left cursor-pointer transition-all duration-200 hover:border-[#E94B3C]/70 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(0,0,0,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E94B3C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080D14]"
    >
      <img
        src={item.img}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-85 group-hover:scale-[1.04] transition-all duration-300"
      />

      {/* Legibility scrim: keeps the course name readable over any photograph */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080D14] via-[#080D14]/75 to-[#080D14]/15 pointer-events-none" />

      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[9.5px] font-bold text-[#FF7A5C] uppercase tracking-wider truncate">
            {item.category}
          </span>
          {item.duration && (
            <span className="shrink-0 text-[9px] font-semibold text-white/85 px-1.5 py-0.5 rounded-[4px] bg-white/12 border border-white/10">
              {item.duration}
            </span>
          )}
        </div>

        <h4 className="text-[12px] sm:text-[14px] font-bold text-white leading-snug line-clamp-3 sm:line-clamp-2">
          {item.title}
        </h4>

        {/* Secondary detail — revealed on hover/focus, never required to identify a course */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] transition-[grid-template-rows] duration-200">
          <div className="overflow-hidden">
            <p className="pt-1 text-[10px] text-slate-300/90 font-medium truncate">
              {item.tools}
            </p>
          </div>
        </div>
      </div>

      <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#E94B3C] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200">
        <ArrowUpRight className="w-3.5 h-3.5" />
      </span>
    </button>
  );
}

export default function Features({ onOpenDemo }) {
  const initialLocation =
    typeof window === 'undefined'
      ? { inCatalogue: false, discipline: 'all', course: null }
      : readLocation(window.location.pathname);

  const [selectedCourseDetail, setSelectedCourseDetail] = useState(initialLocation.course);
  const [activeDiscipline, setActiveDiscipline] = useState(initialLocation.discipline);

  // Back / forward — including the iOS left-edge swipe, which fires popstate
  // like any other history move — replays whatever the address now says.
  useEffect(() => {
    const handlePop = () => {
      const next = readLocation(window.location.pathname);
      setActiveDiscipline(next.discipline);
      setSelectedCourseDetail(next.course);
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  // Landed on a deep link: bring the catalogue into view instead of leaving the
  // visitor at the top of the page with a sheet open over it.
  useEffect(() => {
    if (!initialLocation.inCatalogue) return;
    // Deferred: Lenis and the GSAP reveal animations settle the page height
    // after first paint, so an immediate scroll lands short of the section.
    const timer = setTimeout(() => {
      const section = document.getElementById('features');
      if (!section) return;
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: 'auto' });
    }, 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtering replaces rather than pushes, so a row of chip taps doesn't bury
  // the page the visitor arrived from under a stack of dead entries.
  const selectDiscipline = useCallback((name) => {
    setActiveDiscipline(name);
    window.history.replaceState({ discipline: name }, '', disciplinePath(name));
  }, []);

  const openCourse = useCallback((course) => {
    setSelectedCourseDetail(course);
    window.history.pushState({ course: course.id }, '', coursePath(course));
  }, []);

  const closeCourse = useCallback(() => {
    setSelectedCourseDetail(null);
    // Our own entry is on top: step off it so the address goes back to the
    // discipline. On a deep link there is no entry of ours to pop — rewrite the
    // address instead, so closing never walks off the site.
    if (window.history.state && window.history.state.course) {
      window.history.back();
    } else {
      setActiveDiscipline((current) => {
        window.history.replaceState({ discipline: current }, '', disciplinePath(current));
        return current;
      });
    }
  }, []);

  const visibleGroups =
    activeDiscipline === 'all'
      ? COURSES_BY_DISCIPLINE
      : COURSES_BY_DISCIPLINE.filter((g) => g.name === activeDiscipline);

  return (
    <section
      id="features"
      className="relative py-10 sm:py-20 bg-[#080D14] text-white font-['Plus_Jakarta_Sans',sans-serif] border-t border-white/5"
    >
      <div id="portfolio" className="absolute -top-12 left-0 pointer-events-none" />

      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* COMPACT SECTION HEADER — the catalogue must start high on the page */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
          <div className="max-w-2xl space-y-1.5">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E94B3C]" />
              <span className="text-[10px] font-bold text-[#E94B3C] uppercase tracking-[0.2em]">
                Course Offerings
              </span>
            </div>

            <h2 className="text-2xl sm:text-[32px] font-extrabold text-white tracking-tight leading-tight">
              Find the Right Course for Your Career
            </h2>

            <p className="text-xs sm:text-[13px] text-slate-400 font-normal leading-relaxed">
              Practical, software-oriented programs in AutoCAD, Revit BIM, SolidWorks, MEP, and Project Planning tailored for real-world engineering careers.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
            <GraduationCap className="w-4 h-4 text-[#E94B3C]" />
            <span>
              <strong className="text-white font-bold">{ALL_COURSES.length}</strong> courses across{' '}
              <strong className="text-white font-bold">{COURSES_BY_DISCIPLINE.length}</strong> disciplines
            </span>
          </div>
        </div>

        {/* DISCIPLINE FILTER — optional shortcut, never a prerequisite for discovery */}
        <div className="flex flex-wrap items-center gap-1.5 pb-5 mb-6 border-b border-white/10">
          <button
            type="button"
            onClick={() => selectDiscipline('all')}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${activeDiscipline === 'all'
                ? 'bg-[#E94B3C] text-white'
                : 'bg-white/8 text-slate-300 hover:bg-white/15 hover:text-white'
              }`}
          >
            All {ALL_COURSES.length}
          </button>
          {COURSES_BY_DISCIPLINE.map((group) => (
            <button
              key={group.name}
              type="button"
              onClick={() => selectDiscipline(group.name)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${activeDiscipline === group.name
                  ? 'bg-[#E94B3C] text-white'
                  : 'bg-white/8 text-slate-300 hover:bg-white/15 hover:text-white'
                }`}
            >
              {group.shortName}
              <span className="ml-1.5 opacity-60">{group.courses.length}</span>
            </button>
          ))}
        </div>

        {/* THE CATALOGUE — uniform grid, grouped by discipline, nothing hidden */}
        <div className="space-y-6 sm:space-y-8">
          {visibleGroups.map((group) => (
            <div key={group.name}>
              {/* No nowrap: the long group names plus the count overflow a 320px
                  screen, so the row is allowed to wrap instead. */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                <Layers className="w-3.5 h-3.5 text-[#E94B3C] shrink-0" />
                <h3 className="text-[12px] sm:text-[13px] font-extrabold text-white uppercase tracking-[0.14em] min-w-0">
                  {group.name}
                </h3>
                <span className="text-[11px] font-semibold text-slate-500 shrink-0">
                  {group.courses.length} course{group.courses.length === 1 ? '' : 's'}
                </span>
                <span className="hidden sm:block flex-1 h-px bg-white/10" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3.5">
                {group.courses.map((item) => (
                  <CourseTile
                    key={item.id}
                    item={item}
                    onSelectCourse={openCourse}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note + enquiry CTA */}
        <div className="mt-9 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-400 flex items-center gap-1.5 text-center sm:text-left">
            <Sparkles className="w-3.5 h-3.5 text-[#E94B3C] shrink-0" />
            Click any course to see its syllabus, tools, workflow and career outcomes.
          </p>
          <Button onClick={onOpenDemo} variant="primary" size="sm">
            Enquire About Admissions
          </Button>
        </div>

      </div>

      {/* Course Details Bottom Sheet / Modal */}
      <CourseBottomSheet
        isOpen={!!selectedCourseDetail}
        onClose={closeCourse}
        course={selectedCourseDetail}
        onOpenDemo={onOpenDemo}
      />
    </section>
  );
}
