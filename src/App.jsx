import { useEffect, useMemo, useState } from "react";
import {
  Activity, ArrowDownToLine, ArrowUpRight, BookOpen, Check,
  CheckCircle2, ChevronDown, ChevronRight, Code2, Database,
  ExternalLink, GraduationCap, LayoutDashboard, Play, RotateCcw,
  Search, Target, Video
} from "lucide-react";

const roadmap = [
  ["SQL","Week 1","Introduction to databases and SQL","Understand databases, tables, rows, columns and keys.",["Explain database, table, row and column.","Identify a primary key and a foreign key."],["https://www.w3schools.com/sql/","https://sqlbolt.com/"]],
  ["SQL","Week 1","SELECT and WHERE","Retrieve selected columns and filter records.",["Select all columns from a table.","Select chosen columns and filter by city or ID."],["https://sqlbolt.com/"]],
  ["SQL","Week 1","ORDER BY, DISTINCT and LIMIT","Sort results, remove duplicates and limit output.",["Sort names alphabetically.","List unique cities and return the five newest orders."],["https://www.w3schools.com/sql/"]],
  ["SQL","Week 1","Aggregate functions","Summarise data with COUNT, SUM, AVG, MIN and MAX.",["Count customers and orders.","Calculate total, average, minimum and maximum sales."],["https://www.w3schools.com/sql/"]],
  ["SQL","Week 1","GROUP BY and HAVING","Group rows and filter aggregate results.",["Calculate sales by category.","Show groups that meet a chosen threshold."],["https://sqlbolt.com/"]],
  ["SQL","Week 1","SQL JOINs","Combine related tables using joins.",["Join customers to orders.","Explain INNER JOIN and LEFT JOIN."],["https://sqlbolt.com/"]],
  ["SQL","Week 1","SQL revision and practice","Consolidate SQL foundations with independent exercises.",["Complete at least ten beginner SQL questions.","Redo JOIN and GROUP BY questions without notes."],["https://www.hackerrank.com/domains/sql"]],
  ["Python","Week 2","Python introduction and data types","Learn variables, strings, numbers and booleans.",["Create variables and print their values.","Inspect data types and explain the difference."],["https://docs.python.org/3/tutorial/","https://www.youtube.com/watch?v=rfscVS0vtbw&t=2835s"]],
  ["Python","Week 2","Operators and conditions","Use arithmetic, comparison and logical operators.",["Write a pass/fail checker.","Use AND and OR in a simple condition."],["https://www.w3schools.com/python/"]],
  ["Python","Week 2","Loops","Repeat operations with for and while loops.",["Print numbers from 1 to 100.","Calculate a sum and loop through a product list."],["https://docs.python.org/3/tutorial/"]],
  ["Python","Week 2","Lists and dictionaries","Store collections and key-value information.",["Create a list of five products.","Create a dictionary and read or update values."],["https://docs.python.org/3/tutorial/"]],
  ["Python","Week 2","Functions","Write reusable code with parameters and return values.",["Write a function to calculate total price.","Write and test a function that calculates average sales."],["https://docs.python.org/3/tutorial/"]],
  ["Python","Week 2","Pandas introduction","Create DataFrames, read CSV files and inspect data.",["Create a DataFrame from a dictionary.","Read a CSV and use head, info, describe and shape."],["https://pandas.pydata.org/docs/","https://www.youtube.com/watch?v=mkYBJwX_dMs"]],
  ["Python","Week 2","NumPy introduction","Work with numerical arrays and basic statistics.",["Create a NumPy array.","Calculate sum, mean, minimum and maximum."],["https://numpy.org/doc/","https://www.youtube.com/watch?v=xECXZ3tyONo"]],
  ["Analysis","Week 3","Load and inspect a dataset","Open a real CSV and understand its structure.",["Load the Pandas practice dataset.","Inspect rows, columns, data types and dimensions."],["https://www.kaggle.com/datasets/themrityunjaypathak/pandas-practice-dataset"]],
  ["Analysis","Week 3","Handle missing values","Identify missing data and choose an appropriate treatment.",["Count missing values per column.","Explain whether to fill, retain or remove missing values."],["https://pandas.pydata.org/docs/user_guide/missing_data.html"]],
  ["Analysis","Week 3","Remove duplicates","Detect duplicate records and remove only appropriate rows.",["Count and inspect duplicated rows.","Remove appropriate duplicates and verify the result."],["https://pandas.pydata.org/docs/"]],
  ["Analysis","Week 3","Filtering and sorting","Select useful subsets and order records.",["Filter records using numeric and text conditions.","Sort by a chosen measure in descending order."],["https://pandas.pydata.org/docs/getting_started/intro_tutorials/"]],
  ["Analysis","Week 3","Grouping and calculations","Summarise data using groupby, sum, mean and counts.",["Calculate totals by category.","Interpret the largest and smallest groups."],["https://pandas.pydata.org/docs/user_guide/groupby.html"]],
  ["Analysis","Week 3","Data visualisation","Create readable charts with Matplotlib.",["Create a bar chart and a line chart.","Add titles, axis labels and clear formatting."],["https://matplotlib.org/stable/tutorials/"]],
  ["Analysis","Week 3","Mini-project and review","Complete a small end-to-end cleaning and analysis exercise.",["Clean a dataset and explain each change.","Create two charts and write five evidence-based findings."],["https://www.kaggle.com/learn"]],
  ["Project","Week 4","Understand the Superstore dataset","Frame a retail business question and inspect the data.",["Download the Superstore dataset and check its licence.","Identify date, product, customer, sales and profit fields."],["https://www.kaggle.com/datasets/vivek468/superstore-dataset-final"]],
  ["Project","Week 4","Data cleaning","Validate missing values, duplicates, dates and numeric types.",["Inspect missing values and duplicates.","Convert dates and document data-quality decisions."],["https://pandas.pydata.org/docs/"]],
  ["Project","Week 4","Sales analysis","Calculate revenue, average order value and category performance.",["Calculate total sales and average order value.","Rank products by sales and analyse sales over time."],["https://pandas.pydata.org/docs/user_guide/groupby.html"]],
  ["Project","Week 4","Profitability analysis","Explore profit by product and category and discount effects.",["Calculate profit by category.","Identify low-profit products and explore discount patterns."],["https://matplotlib.org/stable/"]],
  ["Project","Week 4","Regional analysis","Compare sales and profit across business regions.",["Calculate sales by region.","Compare regional profit and explain the results."],["https://pandas.pydata.org/docs/"]],
  ["Project","Week 4","Create project visualisations","Build charts that clearly communicate your analysis.",["Create category sales and regional profit charts.","Create a monthly sales trend and top-products chart."],["https://matplotlib.org/stable/tutorials/"]],
  ["Project","Week 4","Combine SQL and Python","Load cleaned data into SQLite and query it using SQL.",["Create a SQLite database with Python.","Write a GROUP BY query and read results into Pandas."],["https://www.sqlite.org/docs.html","https://docs.python.org/3/library/sqlite3.html"]],
  ["Project","Week 4","Publish on GitHub","Organise notebooks, SQL scripts, findings and setup instructions.",["Create a clear repository structure.","Write a README and check the dataset licence."],["https://docs.github.com/"]],
  ["Project","Week 4","Review and interview preparation","Practise explaining your work and testing your understanding.",["Answer SQL and Python questions without notes.","Explain the business problem, cleaning and findings."],["https://www.hackerrank.com/domains/sql"]]
];

const resources = [
  { title:"SQL YouTube playlist", type:"YouTube playlist", stage:"Week 1 · SQL", url:"https://www.youtube.com/playlist?list=PLrJjaHxyva3X6SLlYQKhuxFS1gBtmx2cY", detail:"SQL foundations and practice." },
  { title:"Python beginner course", type:"YouTube course", stage:"Week 2 · Python", url:"https://www.youtube.com/watch?v=rfscVS0vtbw&t=2835s", detail:"A beginner-friendly Python course." },
  { title:"Pandas video", type:"YouTube lesson", stage:"Week 2 · Pandas", url:"https://www.youtube.com/watch?v=mkYBJwX_dMs", detail:"Introduction to working with data using Pandas." },
  { title:"NumPy video", type:"YouTube lesson", stage:"Week 2 · NumPy", url:"https://www.youtube.com/watch?v=xECXZ3tyONo", detail:"Introduction to numerical computing." },
  { title:"Pandas Practice Dataset", type:"Kaggle dataset", stage:"Week 3 · Practice", url:"https://www.kaggle.com/datasets/themrityunjaypathak/pandas-practice-dataset", detail:"Practise loading, inspecting, cleaning and grouping data." },
  { title:"Superstore Dataset", type:"Kaggle dataset", stage:"Week 4 · Portfolio", url:"https://www.kaggle.com/datasets/vivek468/superstore-dataset-final", detail:"Build a retail sales and profitability analysis project." },
  { title:"SQLBolt", type:"Interactive tutorial", stage:"SQL", url:"https://sqlbolt.com/", detail:"Short interactive SQL lessons." },
  { title:"HackerRank SQL", type:"Practice", stage:"SQL", url:"https://www.hackerrank.com/domains/sql", detail:"SQL challenge questions." },
  { title:"Python documentation", type:"Documentation", stage:"Python", url:"https://docs.python.org/3/tutorial/", detail:"Official Python tutorial." },
  { title:"Pandas documentation", type:"Documentation", stage:"Data analysis", url:"https://pandas.pydata.org/docs/", detail:"Pandas user guide and API reference." }
];

const projectTasks = [
  "Download the Superstore dataset and check its licence.",
  "Inspect fields and document data quality.",
  "Clean missing values, duplicates and date formats.",
  "Analyse sales by category, product and time.",
  "Analyse profit and discount patterns.",
  "Compare sales and profitability by region.",
  "Create clear, labelled visualisations.",
  "Load cleaned data into SQLite and query it with SQL.",
  "Publish notebooks, SQL scripts and findings on GitHub.",
  "Write a README explaining the business problem and results."
];

const KEY = "learntrack-progress-v1";
function readSaved() {
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
}
function App() {
  const [progress, setProgress] = useState(readSaved);
  const [page, setPage] = useState("overview");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(0);
  const [toast, setToast] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(progress)); }, [progress]);
  const completedDays = roadmap.filter((_,i) => !!progress[i]?.done).length;
  const completedTasks = roadmap.reduce((n,d,i) => n + d[4].filter((_,j) => !!progress[i]?.tasks?.[j]).length, 0);
  const totalTasks = roadmap.reduce((n,d) => n + d[4].length, 0);
  const percent = Math.round(completedDays / roadmap.length * 100);
  const projectDone = projectTasks.filter((_,i) => !!progress.project?.[i]).length;
  const notify = (s) => { setToast(s); window.setTimeout(() => setToast(""),2500); };
  const toggleTask = (i,j,value) => setProgress(p => {
    const tasks = {...(p[i]?.tasks || {}),[j]:value};
    return {...p,[i]:{...p[i],tasks,done:roadmap[i][4].every((_,k)=>!!tasks[k])}};
  });
  const toggleDay = (i,value) => setProgress(p => ({...p,[i]:{done:value,tasks:Object.fromEntries(roadmap[i][4].map((_,j)=>[j,value]))}}));
  const exportData = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify({app:"LearnTrack",progress},null,2)],{type:"application/json"}));
    a.download = "learntrack-progress.json"; a.click(); URL.revokeObjectURL(a.href); notify("Progress backup exported");
  };
  const importData = async e => {
    const file=e.target.files?.[0]; if(!file) return;
    try { const d=JSON.parse(await file.text()); if(!d.progress) throw new Error("Invalid backup"); setProgress(d.progress); notify("Progress restored"); }
    catch { notify("That file is not a valid LearnTrack backup"); }
    e.target.value="";
  };
  const reset = () => { setProgress({}); setConfirmReset(false); notify("Progress reset"); };
  const filtered = useMemo(() => roadmap.map((d,i)=>({d,i})).filter(({d}) =>
    (filter==="All" || d[0]===filter) && (d[2]+" "+d[3]).toLowerCase().includes(search.toLowerCase())
  ),[filter,search]);
  const nav = [
    ["overview","Overview",LayoutDashboard],
    ["roadmap","30-day roadmap",BookOpen],
    ["resources","Videos & datasets",Play],
    ["project","Portfolio project",Target]
  ];
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-symbol"><GraduationCap size={21}/></span><div><b>LearnTrack</b><small>PERSONAL LEARNING SPACE</small></div></div>
      <p className="nav-caption">WORKSPACE</p>
      {nav.map(([id,label,Icon])=><button key={id} className={"nav-link "+(page===id?"active":"")} onClick={()=>setPage(id)}><Icon size={17}/>{label}{id==="roadmap"&&<small>30</small>}</button>)}
      <p className="nav-caption progress-caption">YOUR PROGRESS</p>
      <div className="side-progress"><div><span>30-day journey</span><b>{percent}%</b></div><div className="track"><i style={{width:percent+"%"}}/></div><small>{completedDays} of 30 learning days completed</small></div>
      <div className="side-foot"><span>✦</span> Small steps, consistent progress.</div>
    </aside>
    <main className="main">
      <header className="topbar"><div className="crumb">Learning workspace <ChevronRight size={14}/> <b>{nav.find(n=>n[0]===page)?.[1]}</b></div>
        <div className="top-actions"><button onClick={exportData}><ArrowDownToLine size={15}/> Export progress</button><label className="upload-btn"><ArrowUpRight size={15}/> Import backup<input type="file" accept=".json,application/json" onChange={importData}/></label><button onClick={()=>setConfirmReset(true)}><RotateCcw size={15}/> Reset</button></div>
      </header>
      <div className="content">
        {page==="overview" && <>
          <Heading eyebrow="YOUR LEARNING DASHBOARD" title="Good progress starts here." text="Build practical SQL and Python skills, one focused session at a time."/>
          <section className="hero"><div><label>THE NEXT 30 DAYS</label><h2>Learn the skills.<br/><em>Build something real.</em></h2><p>A structured path from SQL and Python fundamentals to a retail data-analysis portfolio project.</p><button className="primary" onClick={()=>{setPage("roadmap");setExpanded(Math.max(0,roadmap.findIndex((_,i)=>!progress[i]?.done)));}}>Continue learning <ChevronRight size={16}/></button></div><div className="hero-art"><div className="hero-orbit"/><span><GraduationCap size={40}/></span><b>SQL</b><i>PYTHON</i></div></section>
          <div className="stats">
            <Metric label="Days completed" value={completedDays+"/30"} sub="Learning milestones" icon={CheckCircle2}/>
            <Metric label="Overall progress" value={percent+"%"} sub="Across the roadmap" icon={Activity}/>
            <Metric label="Tasks checked" value={completedTasks+"/"+totalTasks} sub="Practical actions" icon={Target}/>
            <Metric label="Project checklist" value={projectDone+"/10"} sub="Portfolio deliverables" icon={Code2}/>
          </div>
          <Section title="Your learning path" subtitle="Four stages. One practical outcome." action={<button className="link-button" onClick={()=>setPage("roadmap")}>View all 30 days <ArrowUpRight size={14}/></button>}/>
          <div className="stages">{[["SQL foundations","SQL","01—07",Database],["Python foundations","Python","08—14",Code2],["Data analysis","Analysis","15—21",Activity],["Portfolio project","Project","22—30",Target]].map(([name,key,days,Icon],n)=>{const indexes=roadmap.map((d,i)=>d[0]===key?i:-1).filter(i=>i>=0);const count=indexes.filter(i=>progress[i]?.done).length;return <button className="stage" key={key} onClick={()=>{setFilter(key);setPage("roadmap");}}><div className="stage-head"><span className="stage-icon"><Icon size={19}/></span><small>STAGE 0{n+1} · {days}</small></div><b>{name}</b><span>{count} of {indexes.length} days complete</span><div className="track"><i style={{width:(count/indexes.length*100)+"%"}}/></div></button>})}</div>
          <Section title="Keep your resources close" subtitle="Lessons and datasets from the learning plan." action={<button className="link-button" onClick={()=>setPage("resources")}>Open resources <ArrowUpRight size={14}/></button>}/>
          <div className="resource-mini"><button onClick={()=>setPage("resources")}><Video size={19}/><span><b>Video lessons</b><small>SQL, Python, Pandas and NumPy</small></span><ChevronRight size={17}/></button><button onClick={()=>setPage("resources")}><Database size={19}/><span><b>Practice datasets</b><small>Pandas practice and Superstore</small></span><ChevronRight size={17}/></button></div>
        </>}
        {page==="roadmap" && <>
          <Heading eyebrow="THE CURRICULUM" title="Your 30-day roadmap." text="Work through each day in sequence. Tick off individual tasks or complete a full day."/>
          <div className="curr-summary"><b>{completedDays}<small>/30</small></b><span>days completed</span><div><strong>{percent}% complete</strong><div className="track"><i style={{width:percent+"%"}}/></div><small>{completedTasks} practical tasks checked</small></div></div>
          <div className="toolbar"><div className="filters">{["All","SQL","Python","Analysis","Project"].map(f=><button className={filter===f?"selected":""} onClick={()=>setFilter(f)} key={f}>{f==="Analysis"?"Data analysis":f==="Project"?"Portfolio":f==="All"?"All days":f}</button>)}</div><label className="search"><Search size={15}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search lessons..."/></label></div>
          <div className="lesson-list">{filtered.map(({d,i})=>{const done=!!progress[i]?.done;const open=expanded===i;const count=d[4].filter((_,j)=>!!progress[i]?.tasks?.[j]).length;return <article className="lesson" key={i}><div className="lesson-row"><button className={"day-check "+(done?"is-done":"")} onClick={()=>toggleDay(i,!done)} aria-label={"Mark day "+(i+1)+" complete"}>{done&&<Check size={14}/>}</button><button className="lesson-info" onClick={()=>setExpanded(open?-1:i)}><small>DAY {String(i+1).padStart(2,"0")} · {d[0]} · {d[1]}</small><b>{d[2]}</b><span>{d[3]}</span></button><div className="lesson-actions"><small>{count}/{d[4].length}</small><button onClick={()=>setExpanded(open?-1:i)}>{open?<ChevronDown size={18}/>:<ChevronRight size={18}/>}</button></div></div>{open&&<div className="lesson-detail"><label>PRACTICAL CHECKLIST</label>{d[4].map((task,j)=><label className="task" key={j}><input type="checkbox" checked={!!progress[i]?.tasks?.[j]} onChange={e=>toggleTask(i,j,e.target.checked)}/>{task}</label>)}<div className="related"><small>RELATED LEARNING</small>{d[5].map(url=><a href={url} target="_blank" rel="noreferrer" key={url}>Open resource <ExternalLink size={12}/></a>)}</div></div>}</article>})}{filtered.length===0&&<p className="empty">No lessons found. Try another search or filter.</p>}</div>
        </>}
        {page==="resources" && <>
          <Heading eyebrow="RESOURCE LIBRARY" title="Learn from the right material." text="The roadmap’s video lessons, datasets and free documentation, organised in one place."/>
          <div className="callout"><BookOpen size={20}/><div><b>Follow the sequence</b><p>Use the Pandas Practice dataset in Week 3. Save the Superstore dataset for your Week 4 portfolio project.</p></div></div>
          <div className="resource-grid">{resources.map((r,i)=><a href={r.url} target="_blank" rel="noreferrer" className="resource-card" key={r.title}><span className="resource-icon">{r.type.includes("YouTube")?<Play size={18}/>:r.type.includes("Kaggle")?<Database size={18}/>:<BookOpen size={18}/>}</span><span><small>{r.type} · {r.stage}</small><b>{r.title}</b><p>{r.detail}</p></span><ExternalLink size={15}/></a>)}</div>
        </>}
        {page==="project" && <>
          <Heading eyebrow="FINAL DELIVERABLE" title="Build your first portfolio project." text="A retail sales and profitability analysis that brings SQL and Python together."/>
          <section className="project-hero"><small>CAPSTONE PROJECT · DAYS 22–30</small><h2>Retail Sales &<br/>Profitability Analysis</h2><p>Help a retail business understand revenue, profit, product categories and regional performance using a real-world dataset.</p><a className="primary" href="https://www.kaggle.com/datasets/vivek468/superstore-dataset-final" target="_blank" rel="noreferrer">Get the Superstore dataset <ExternalLink size={15}/></a></section>
          <div className="project-progress"><b>{projectDone}/10</b><div><div className="track"><i style={{width:(projectDone/10*100)+"%"}}/></div><small>{projectDone*10}% of project steps completed</small></div></div>
          <Section title="Project completion checklist" subtitle="Tick each deliverable as you finish it."/>
          <div className="project-list">{projectTasks.map((t,i)=><label key={i} className="project-task"><input type="checkbox" checked={!!progress.project?.[i]} onChange={e=>setProgress(p=>({...p,project:{...p.project,[i]:e.target.checked}}))}/><small>{String(i+1).padStart(2,"0")}</small><span>{t}</span>{progress.project?.[i]&&<CheckCircle2 size={16}/>}</label>)}</div>
          <div className="callout"><Code2 size={20}/><div><b>Suggested GitHub structure</b><pre>retail-sales-analysis/<br/>├── notebooks/<br/>├── sql/<br/>├── reports/<br/>├── visualisations/<br/>└── README.md</pre></div></div>
        </>}
      </div>
      <footer><b>LEARNTRACK</b><span>Progress is saved in this browser · No account required</span></footer>
    </main>
    {confirmReset&&<div className="modal-bg"><div className="modal"><b>Reset your learning progress?</b><p>This clears all checked days, tasks and portfolio steps saved in this browser.</p><div><button onClick={()=>setConfirmReset(false)}>Cancel</button><button className="danger" onClick={reset}>Reset progress</button></div></div></div>}
    {toast&&<div className="toast"><CheckCircle2 size={16}/>{toast}</div>}
  </div>;
}
function Heading({eyebrow,title,text}){return <div className="heading"><small>{eyebrow}</small><h1>{title}</h1><p>{text}</p></div>}
function Metric({label,value,sub,icon:Icon}){return <div className="metric"><div><span>{label}</span><i><Icon size={17}/></i></div><b>{value}</b><small>{sub}</small></div>}
function Section({title,subtitle,action}){return <div className="section-head"><div><h2>{title}</h2><p>{subtitle}</p></div>{action}</div>}
export default App;
