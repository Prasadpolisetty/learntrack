import { useEffect, useMemo, useState } from "react";
import heroBackground from "./learntrack-hero.webp";
import {
  Activity, ArrowDownToLine, ArrowRight, ArrowUpRight, BookOpen,
  BookOpenCheck, CalendarDays, Check, CheckCircle2, ChevronDown,
  ChevronRight, CircleDot, Clock3, Code2, Database, ExternalLink,
  FileText, GraduationCap, Layers3, Play, RotateCcw, Search,
  Sparkles, Target, Video, X
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
  { title:"SQL YouTube playlist", type:"Video series", stage:"WEEK 01 · SQL", url:"https://www.youtube.com/playlist?list=PLrJjaHxyva3X6SLlYQKhuxFS1gBtmx2cY", detail:"SQL foundations and practice." },
  { title:"Python beginner course", type:"Video course", stage:"WEEK 02 · PYTHON", url:"https://www.youtube.com/watch?v=rfscVS0vtbw&t=2835s", detail:"A beginner-friendly Python course." },
  { title:"Pandas video", type:"Video lesson", stage:"WEEK 02 · PANDAS", url:"https://www.youtube.com/watch?v=mkYBJwX_dMs", detail:"Introduction to working with data using Pandas." },
  { title:"NumPy video", type:"Video lesson", stage:"WEEK 02 · NUMPY", url:"https://www.youtube.com/watch?v=xECXZ3tyONo", detail:"Introduction to numerical computing." },
  { title:"Pandas Practice Dataset", type:"Kaggle dataset", stage:"WEEK 03 · PRACTICE", url:"https://www.kaggle.com/datasets/themrityunjaypathak/pandas-practice-dataset", detail:"Practise loading, inspecting, cleaning and grouping data." },
  { title:"Superstore Dataset", type:"Kaggle dataset", stage:"WEEK 04 · PORTFOLIO", url:"https://www.kaggle.com/datasets/vivek468/superstore-dataset-final", detail:"Build a retail sales and profitability analysis project." },
  { title:"SQLBolt", type:"Interactive tutorial", stage:"REFERENCE · SQL", url:"https://sqlbolt.com/", detail:"Short interactive SQL lessons." },
  { title:"HackerRank SQL", type:"Practice library", stage:"REFERENCE · SQL", url:"https://www.hackerrank.com/domains/sql", detail:"SQL challenge questions." },
  { title:"Python documentation", type:"Documentation", stage:"REFERENCE · PYTHON", url:"https://docs.python.org/3/tutorial/", detail:"Official Python tutorial." },
  { title:"Pandas documentation", type:"Documentation", stage:"REFERENCE · ANALYSIS", url:"https://pandas.pydata.org/docs/", detail:"Pandas user guide and API reference." }
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

const STORAGE_KEY = "learntrack-progress-v1";
const chapters = [
  {key:"SQL",number:"01",name:"SQL Learning",range:"DAYS 01–07",description:"Query data with confidence.",icon:Database},
  {key:"Python",number:"02",name:"Python Foundations",range:"DAYS 08–14",description:"Learn Python and core programming.",icon:Code2},
  {key:"Analysis",number:"03",name:"Data Analysis",range:"DAYS 15–21",description:"Clean, explore and explain real data.",icon:Activity},
  {key:"Project",number:"04",name:"Portfolio Project",range:"DAYS 22–30",description:"Build and present your portfolio.",icon:Target}
];
const navItems = [
  ["overview","Dashboard",Layers3],
  ["roadmap","Roadmap",CalendarDays],
  ["resources","Resources",BookOpen],
  ["project","Project",Target],
  ["progress","Progress",Activity]
];

function readSaved() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
}
function mergeProgress(current,incoming) {
  const merged={...current,...incoming};
  roadmap.forEach((day,dayIndex)=>{
    const currentTasks=current[dayIndex]?.tasks || {};
    const importedTasks=incoming[dayIndex]?.tasks || {};
    const tasks=Object.fromEntries(day[4].map((_,taskIndex)=>[
      taskIndex,!!currentTasks[taskIndex]||!!importedTasks[taskIndex]
    ]));
    merged[dayIndex]={
      ...(current[dayIndex]||{}),
      ...(incoming[dayIndex]||{}),
      tasks,
      done:day[4].every((_,taskIndex)=>!!tasks[taskIndex])
    };
  });
  const project={...(current.project||{}),...(incoming.project||{})};
  projectTasks.forEach((_,index)=>{
    project[index]=!!current.project?.[index]||!!incoming.project?.[index];
  });
  merged.project=project;
  return merged;
}

function App() {
  const [progress,setProgress] = useState(readSaved);
  const [page,setPage] = useState("overview");
  const [filter,setFilter] = useState("All");
  const [search,setSearch] = useState("");
  const [expanded,setExpanded] = useState(0);
  const [toast,setToast] = useState("");
  const [confirmReset,setConfirmReset] = useState(false);
  const [pendingImport,setPendingImport] = useState(null);
  useEffect(() => { localStorage.setItem(STORAGE_KEY,JSON.stringify(progress)); },[progress]);

  const completedDays = roadmap.filter((_,i) => !!progress[i]?.done).length;
  const completedTasks = roadmap.reduce((sum,day,i) => sum + day[4].filter((_,j) => !!progress[i]?.tasks?.[j]).length,0);
  const totalTasks = roadmap.reduce((sum,day) => sum + day[4].length,0);
  const percent = Math.round(completedDays/30*100);
  const projectDone = projectTasks.filter((_,i) => !!progress.project?.[i]).length;
  const nextIndex = roadmap.findIndex((_,i) => !progress[i]?.done);
  const nextDay = nextIndex < 0 ? null : roadmap[nextIndex];

  const notify = message => {
    setToast(message);
    window.setTimeout(() => setToast(""),2500);
  };
  const toggleTask = (dayIndex,taskIndex,value) => setProgress(current => {
    const tasks = {...(current[dayIndex]?.tasks || {}),[taskIndex]:value};
    return {...current,[dayIndex]:{...current[dayIndex],tasks,done:roadmap[dayIndex][4].every((_,i)=>!!tasks[i])}};
  });
  const toggleDay = (dayIndex,value) => setProgress(current => ({
    ...current,[dayIndex]:{done:value,tasks:Object.fromEntries(roadmap[dayIndex][4].map((_,i)=>[i,value]))}
  }));
  const exportProgress = () => {
    const payload = {app:"LearnTrack",exportedAt:new Date().toISOString(),progress};
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}));
    const link = document.createElement("a");
    link.href=url;link.download="learntrack-progress.json";link.click();URL.revokeObjectURL(url);
    notify("Your progress backup is ready");
  };
  const importProgress = async event => {
    const input=event.target;
    const file=input.files?.[0];
    if(!file) return;
    try {
      const parsed=JSON.parse(await file.text());
      if(!parsed.progress || typeof parsed.progress!=="object" || Array.isArray(parsed.progress)) throw new Error("Invalid backup");
      const incoming=parsed.progress;
      const days=roadmap.filter((_,index)=>!!incoming[index]?.done).length;
      const tasks=roadmap.reduce((sum,day,index)=>sum+day[4].filter((_,taskIndex)=>!!incoming[index]?.tasks?.[taskIndex]).length,0);
      setPendingImport({progress:incoming,fileName:file.name,days,tasks});
    } catch { notify("This file is not a valid LearnTrack backup. Choose a JSON backup exported from LearnTrack."); }
    finally { input.value=""; }
  };
  const applyImport = mode => {
    if(!pendingImport) return;
    if(mode==="merge") setProgress(current=>mergeProgress(current,pendingImport.progress));
    else setProgress(pendingImport.progress);
    setPendingImport(null);
    notify(mode==="merge"?"Backup merged with saved progress":"Backup replaced saved progress");
  };
  const resetProgress = () => {setProgress({});setConfirmReset(false);notify("Progress has been reset");};
  const filteredDays = useMemo(() => roadmap.map((day,index)=>({day,index})).filter(({day}) =>
    (filter==="All" || day[0]===filter) && (day[2]+" "+day[3]).toLowerCase().includes(search.toLowerCase())
  ),[filter,search]);
  const navigate = id => {setPage(id);window.scrollTo({top:0,behavior:"smooth"});};
  const activeLabel = navItems.find(item=>item[0]===page)?.[1] || "Overview";

  return <div className="site-shell">
    <div className="site-background" aria-hidden="true"><img src={heroBackground} alt="" /></div>
    <header className="site-header">
      <a className="brand-lockup" href="#top" onClick={e=>{e.preventDefault();navigate("overview");}}>
        <span className="brand-mark"><GraduationCap size={21}/></span>
        <span className="brand-copy"><strong>learntrack<span>.</span></strong><small>LEARN WITH INTENTION</small></span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map(([id,label,Icon])=><button key={id} className={page===id?"nav-tab nav-tab-active":"nav-tab"} onClick={()=>navigate(id)}><Icon size={15}/>{label}</button>)}
      </nav>
      <div className="header-tools">
        <button className="tool-button export-button" onClick={exportProgress}><ArrowDownToLine size={15}/><span>Export</span></button>
        <label className="tool-button import-button"><ArrowUpRight size={15}/><span>Import</span><input type="file" accept=".json,application/json" onChange={importProgress}/></label>
      </div>
    </header>

    <main id="top" className="main-content">
      {page==="overview" && <Overview
        completedDays={completedDays} completedTasks={completedTasks} totalTasks={totalTasks}
        percent={percent} projectDone={projectDone} nextIndex={nextIndex} nextDay={nextDay}
        progress={progress} navigate={navigate} setFilter={setFilter} setExpanded={setExpanded}
      />}

      {page==="progress" && <ProgressPage
        completedDays={completedDays} completedTasks={completedTasks} totalTasks={totalTasks}
        percent={percent} projectDone={projectDone} progress={progress} navigate={navigate}
      />}

      {page==="roadmap" && <section className="page-section">
        <PageIntro eyebrow="THE 30-DAY ROUTE" title={<>A clear path.<br/><span>Visible progress.</span></>} text="Move from first queries to a portfolio you can confidently explain. Every day has a small, practical outcome."/>
        <div className="roadmap-overview glass-panel">
          <div className="roadmap-overview-number"><strong>{completedDays.toString().padStart(2,"0")}</strong><span>/ 30 DAYS</span></div>
          <div className="roadmap-overview-bar"><div className="overview-bar-top"><b>{percent}% completed</b><span>{completedTasks} of {totalTasks} tasks checked</span></div><div className="progress-line"><span style={{width:percent+"%"}}/></div></div>
          <div className="roadmap-overview-note"><span className="pulse-dot"/>Your progress is saved on this device</div>
        </div>
        <div className="lesson-toolbar">
          <div className="filter-list">{["All","SQL","Python","Analysis","Project"].map(item=><button key={item} className={filter===item?"filter-button filter-active":"filter-button"} onClick={()=>setFilter(item)}>{item==="All"?"All days":item==="Analysis"?"Data analysis":item==="Project"?"Portfolio":item}</button>)}</div>
          <label className="search-field"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find a lesson..."/>{search&&<button onClick={()=>setSearch("")} aria-label="Clear search"><X size={14}/></button>}</label>
        </div>
        <div className="roadmap-layout">
          <div className="lesson-stack">
            {filteredDays.map(({day,index})=>{
              const done=!!progress[index]?.done;
              const open=expanded===index;
              const checked=day[4].filter((_,j)=>!!progress[index]?.tasks?.[j]).length;
              return <article className={done?"lesson-card lesson-complete":"lesson-card"} key={index}>
                <div className="lesson-card-main">
                  <button className={done?"lesson-toggle lesson-toggle-done":"lesson-toggle"} onClick={()=>toggleDay(index,!done)} aria-label={"Mark Day "+(index+1)+" complete"}>{done&&<Check size={15}/>}</button>
                  <button className="lesson-open" onClick={()=>setExpanded(open?-1:index)}>
                    <span className="lesson-kicker">DAY {String(index+1).padStart(2,"0")} <i/> {day[0]} <i/> {day[1]}</span>
                    <strong>{day[2]}</strong><small>{day[3]}</small>
                  </button>
                  <span className="lesson-completion">{checked}/{day[4].length}</span>
                  <button className="lesson-chevron" onClick={()=>setExpanded(open?-1:index)} aria-label={open?"Collapse lesson":"Expand lesson"}>{open?<ChevronDown size={18}/>:<ChevronRight size={18}/>}</button>
                </div>
                {open&&<div className="lesson-expanded">
                  <div className="expanded-label">YOUR PRACTICE CHECKLIST</div>
                  {day[4].map((task,j)=><label className="check-row" key={j}><input type="checkbox" checked={!!progress[index]?.tasks?.[j]} onChange={e=>toggleTask(index,j,e.target.checked)}/><span>{task}</span></label>)}
                  <div className="lesson-resources"><span>OPEN A LEARNING RESOURCE</span>{day[5].map(url=><a key={url} href={url} target="_blank" rel="noreferrer">Study this topic <ExternalLink size={13}/></a>)}</div>
                </div>}
              </article>;
            })}
            {filteredDays.length===0&&<div className="empty-state"><Search size={22}/><strong>No lessons match that search.</strong><span>Try a different phrase or choose another topic.</span></div>}
          </div>
          <aside className="roadmap-aside glass-panel">
            <span className="aside-overline">YOUR LEARNING RHYTHM</span>
            <div className="mini-ring"><ProgressRing percent={percent} size={108}/><div><b>{percent}%</b><small>complete</small></div></div>
            <h3>Progress over perfection.</h3>
            <p>Small sessions add up. Complete a task, mark the day, and keep moving forward.</p>
            <div className="aside-stat"><span>Days completed</span><b>{completedDays} / 30</b></div>
            <div className="aside-stat"><span>Tasks completed</span><b>{completedTasks} / {totalTasks}</b></div>
            <button className="text-action" onClick={exportProgress}>Save a progress backup <ArrowUpRight size={14}/></button>
          </aside>
        </div>
      </section>}

      {page==="resources" && <section className="page-section">
        <PageIntro eyebrow="THE RESOURCE SHELF" title={<>Good resources.<br/><span>Better practice.</span></>} text="Lessons, documentation and real datasets selected to support each stage of the roadmap."/>
        <div className="resource-feature glass-panel">
          <div className="resource-feature-icon"><Database size={24}/></div>
          <div><span className="eyebrow">YOUR DATA PRACTICE TOOLKIT</span><h2>Learn it. Try it. Apply it.</h2><p>Use the Pandas Practice dataset while learning data manipulation. Keep the Superstore dataset for your final portfolio project.</p></div>
          <div className="feature-count"><strong>10</strong><span>CURATED LINKS</span></div>
        </div>
        <div className="resource-section-head"><div><span className="eyebrow">ALL MATERIALS</span><h2>Explore the shelf</h2></div><span className="subtle-count">{resources.length} RESOURCES</span></div>
        <div className="resource-grid">
          {resources.map((item,index)=><a className="resource-tile" key={item.url} href={item.url} target="_blank" rel="noreferrer">
            <div className="resource-tile-top"><span className={"resource-kind kind-"+(item.type.includes("Kaggle")?"dataset":item.type.includes("Video")?"video":"reference")}>{item.type.includes("Kaggle")?<Database size={17}/>:item.type.includes("Video")?<Play size={17}/>:<FileText size={17}/>}</span><span className="resource-index">{String(index+1).padStart(2,"0")}</span></div>
            <span className="resource-stage">{item.stage}</span><strong>{item.title}</strong><p>{item.detail}</p><span className="resource-open">Open resource <ArrowUpRight size={14}/></span>
          </a>)}
        </div>
      </section>}

      {page==="project" && <section className="page-section">
        <PageIntro eyebrow="THE CAPSTONE" title={<>Turn skills into<br/><span>proof of work.</span></>} text="Bring SQL, Python and analysis together in one portfolio project built around a real retail dataset."/>
        <div className="capstone-panel">
          <div className="capstone-copy"><span className="capstone-tag"><Sparkles size={14}/> YOUR FINAL DELIVERABLE</span><h2>Retail sales<br/> &amp; profitability.</h2><p>Investigate what sells, what earns profit, and how performance changes across products, categories and regions.</p><a className="jade-button" href="https://www.kaggle.com/datasets/vivek468/superstore-dataset-final" target="_blank" rel="noreferrer">Get the Superstore dataset <ArrowUpRight size={16}/></a></div>
          <div className="capstone-diagram"><div className="diagram-window"><div className="diagram-bar"><i/><i/><i/><span>SALES_ANALYSIS.PY</span></div><div className="diagram-lines"><b/><b/><b/><b/><b/><i/><i/><b/></div><div className="diagram-footer"><span>SQL</span><span>PYTHON</span><span>INSIGHTS</span></div></div><span className="diagram-caption">FROM RAW DATA TO BUSINESS INSIGHT</span></div>
        </div>
        <div className="project-summary-row"><div><span className="eyebrow">PROJECT CHECKLIST</span><h2>{projectDone} <small>/ 10 complete</small></h2></div><div className="project-summary-track"><div className="progress-line"><span style={{width:(projectDone/10*100)+"%"}}/></div><span>{projectDone*10}% of your deliverables are complete</span></div></div>
        <div className="project-checklist-grid">
          {projectTasks.map((task,index)=><label className={progress.project?.[index]?"project-check project-check-done":"project-check"} key={index}>
            <input type="checkbox" checked={!!progress.project?.[index]} onChange={e=>setProgress(current=>({...current,project:{...current.project,[index]:e.target.checked}}))}/>
            <span className="project-number">{String(index+1).padStart(2,"0")}</span><span className="project-task-copy">{task}</span><span className="project-tick"><Check size={14}/></span>
          </label>)}
        </div>
        <div className="github-note glass-panel"><span><Code2 size={20}/></span><div><b>A clean repository tells the story.</b><p>Keep notebooks, SQL scripts, visualisations and your findings organised so someone can understand the work quickly.</p><code>notebooks/ · sql/ · reports/ · visualisations/ · README.md</code></div></div>
      </section>}
    </main>

    <footer className="site-footer"><a className="footer-brand" href="#top" onClick={e=>{e.preventDefault();navigate("overview");}}>learntrack<span>.</span></a><span>Made for steady progress, not perfect streaks.</span><div><span>30 DAYS</span><i/> <span>SQL + PYTHON</span></div></footer>

    {pendingImport&&<div className="modal-backdrop" onClick={()=>setPendingImport(null)}><div className="confirm-dialog import-dialog" role="dialog" aria-modal="true" aria-labelledby="import-title" aria-describedby="import-description" onClick={e=>e.stopPropagation()} onKeyDown={e=>{if(e.key==="Escape")setPendingImport(null);}}><span className="confirm-icon"><ArrowUpRight size={19}/></span><h3 id="import-title">Import progress backup?</h3><p id="import-description"><strong>{pendingImport.fileName}</strong> contains {pendingImport.days} completed days and {pendingImport.tasks} checked lesson tasks. This browser has {completedDays} completed days and {completedTasks} checked lesson tasks. Merge keeps checked tasks from either version; replace uses only this backup.</p><div className="import-choice-row"><button className="soft-button" onClick={()=>applyImport("merge")}>Merge checked tasks</button><button className="jade-button" onClick={()=>applyImport("replace")}>Replace saved progress</button></div><button className="text-action import-cancel" onClick={()=>setPendingImport(null)}>Cancel</button></div></div>}
    {confirmReset&&<div className="modal-backdrop" onClick={()=>setConfirmReset(false)}><div className="confirm-dialog" role="dialog" aria-modal="true" onClick={e=>e.stopPropagation()}><span className="confirm-icon"><RotateCcw size={19}/></span><h3>Start with a clean slate?</h3><p>This clears completed days, tasks and portfolio steps saved in this browser. Export a backup first if you may need it.</p><div><button className="soft-button" onClick={()=>setConfirmReset(false)}>Keep my progress</button><button className="jade-button" onClick={resetProgress}>Reset progress</button></div></div></div>}
    {toast&&<div className="toast-message"><CheckCircle2 size={16}/>{toast}</div>}
  </div>;
}

function PageIntro({eyebrow,title,text}) {
  return <div className="page-intro"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div>;
}
function ProgressRing({percent,size=120}) {
  const radius=(size-12)/2;
  const circumference=2*Math.PI*radius;
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="progress-ring" aria-label={percent+" percent complete"}>
    <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#e7eee9" strokeWidth="7"/>
    <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#171717" strokeWidth="7" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference*(1-percent/100)} transform={`rotate(-90 ${size/2} ${size/2})`}/>
  </svg>;
}
function Overview({completedDays,completedTasks,totalTasks,percent,projectDone,nextIndex,nextDay,progress,navigate,setFilter,setExpanded}) {
  const learningPaths = chapters.map(chapter=>{
    const indexes=roadmap.map((day,index)=>day[0]===chapter.key?index:-1).filter(index=>index>=0);
    const done=indexes.filter(index=>!!progress[index]?.done).length;
    return {
      title:chapter.name,
      range:chapter.range,
      detail:chapter.description,
      icon:chapter.icon,
      indexes,
      firstIndex:indexes[0] ?? 0,
      filter:chapter.key,
      done,
      total:indexes.length,
      percent:Math.round(done/indexes.length*100)
    };
  });

  return <section className="overview-page">
    <div className="welcome-topline">
      <span className="eyebrow">YOUR 30-DAY LEARNING JOURNEY</span>
      <span className="welcome-date"><CircleDot size={12}/> LEARN WITH INTENTION</span>
    </div>

    <div className="intro-layout">
      <div className="intro-copy">
        <span className="hero-kicker">SQL · PYTHON · REAL-WORLD PRACTICE</span>
        <h1>Build your<br/><em>Data Skills.</em></h1>
        <p>A practical, step-by-step plan to learn SQL and Python, apply them to real data, and build a portfolio project you can show with confidence.</p>
        <div className="intro-actions">
          <button className="jade-button" onClick={()=>{navigate("roadmap");setFilter("All");setExpanded(Math.max(0,nextIndex));}}>
            {nextDay?("Open Day "+String(nextIndex+1).padStart(2,"0")):"Review your roadmap"} <ArrowRight size={16}/>
          </button>
          <button className="outline-button" onClick={()=>navigate("roadmap")}><CalendarDays size={16}/> View Roadmap</button>
        </div>
      </div>
      <section className="next-focus glass-panel next-focus-hero">
        <div className="focus-label"><span className="eyebrow">PICK UP WHERE YOU LEFT OFF</span><span className="focus-day">{nextDay?"DAY "+String(nextIndex+1).padStart(2,"0"):"ALL DAYS COMPLETE"}</span></div>
        {nextDay?<><h2>{nextDay[2]}</h2><p>{nextDay[3]}</p><div className="focus-checklist">{nextDay[4].slice(0,2).map((task,index)=><div key={index}><span>{index+1}</span>{task}</div>)}</div><button className="focus-link" onClick={()=>{navigate("roadmap");setFilter("All");setExpanded(nextIndex);}}>Continue Learning <ArrowRight size={15}/></button></>:<><h2>You completed the 30-day roadmap.</h2><p>Review your portfolio project and keep building on what you have learned.</p><button className="focus-link" onClick={()=>navigate("project")}>Review your project <ArrowRight size={15}/></button></>}
      </section>
    </div>

    <div className="metric-grid" id="progress-summary">
      <article className="metric-card">
        <span className="metric-icon"><Target size={25}/></span>
        <div className="metric-copy"><strong>30 Days</strong><span>Learning Plan</span></div>
      </article>
      <article className="metric-card">
        <span className="metric-icon"><Layers3 size={25}/></span>
        <div className="metric-copy"><strong>2 Core Skills</strong><span>SQL · Python</span></div>
      </article>
      <article className="metric-card">
        <span className="metric-icon"><Code2 size={25}/></span>
        <div className="metric-copy"><strong>1 Project</strong><span>Portfolio project</span></div>
      </article>
      <article className="metric-card metric-progress">
        <span className="metric-icon"><Activity size={25}/></span>
        <div className="metric-copy metric-progress-copy">
          <strong>Your Progress</strong><span>{percent}% Complete · {completedDays}/30 days</span>
          <div className="progress-line"><span style={{width:percent+"%"}}/></div>
        </div>
      </article>
    </div>

    <section className="learning-section">
      <div className="learning-section-heading">
        <div>
          <span className="eyebrow">THE LEARNING PATH</span>
          <h2>Your Learning Path</h2>
          <p>Follow a structured plan, track your progress, and build real skills.</p>
        </div>
        <button className="text-action roadmap-action" onClick={()=>navigate("roadmap")}>Go to Roadmap <ArrowRight size={15}/></button>
      </div>

      <div className="learning-path-grid">
        {learningPaths.map((item,index)=>{
          const Icon=item.icon;
          return <article
            className="learning-path-card"
            key={item.title}
            role="button"
            tabIndex={0}
            onClick={()=>{setFilter(item.filter);navigate("roadmap");setExpanded(item.firstIndex);}}
            onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();setFilter(item.filter);navigate("roadmap");setExpanded(item.firstIndex);}}}
          >
            <div className="learning-path-top">
              <span className="learning-path-icon"><Icon size={25}/></span>
              <span className="learning-path-index">0{index+1}</span>
            </div>
            <span className="learning-path-range">{item.range}</span>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
            <div className="learning-path-foot">
              <div className="progress-line"><span style={{width:item.percent+"%"}}/></div>
              <span>{item.done}/{item.total}</span>
              <ArrowRight size={17}/>
            </div>
          </article>;
        })}
      </div>
    </section>

    <div className="bottom-overview-grid">
      
      <section className="learning-note">
        <span className="note-icon"><BookOpenCheck size={20}/></span>
        <span className="eyebrow">A NOTE ON CONSISTENCY</span>
        <h2>Progress is a practice, not a race.</h2>
        <p>Small sessions add up. Use each checklist to make the next step clear and keep moving at your own pace.</p>
        <button className="text-action" onClick={()=>navigate("resources")}>Explore learning resources <ArrowUpRight size={14}/></button>
      </section>
    </div>
  </section>;
}

function ProgressPage({completedDays,completedTasks,totalTasks,percent,projectDone,progress,navigate}) {
  const chapterStats=chapters.map(chapter=>{
    const indexes=roadmap.map((day,index)=>day[0]===chapter.key?index:-1).filter(index=>index>=0);
    const done=indexes.filter(index=>!!progress[index]?.done).length;
    return {...chapter,done,total:indexes.length,percent:Math.round(done/indexes.length*100)};
  });
  return <section className="page-section progress-page">
    <PageIntro eyebrow="YOUR LEARNING JOURNEY" title={<>Small steps.<br/><span>Visible progress.</span></>} text="A clear view of the work you have completed and the skills you are building."/>
    <div className="progress-page-overview glass-panel">
      <div className="progress-page-ring">
        <ProgressRing percent={percent} size={156}/>
        <div><strong>{percent}%</strong><span>COMPLETE</span></div>
      </div>
      <div className="progress-page-copy">
        <span className="eyebrow">OVERALL COMPLETION</span>
        <h2>{completedDays===30?"You completed the roadmap.":"You are building momentum."}</h2>
        <p>{completedDays} of 30 learning days completed, with {completedTasks} of {totalTasks} practice tasks checked off.</p>
        <button className="jade-button" onClick={()=>navigate("roadmap")}>Continue the Roadmap <ArrowRight size={16}/></button>
      </div>
    </div>
    <div className="metric-grid progress-metric-grid">
      <article className="metric-card"><span className="metric-icon"><CalendarDays size={24}/></span><div className="metric-copy"><strong>{completedDays}/30</strong><span>Days completed</span></div></article>
      <article className="metric-card"><span className="metric-icon"><CheckCircle2 size={24}/></span><div className="metric-copy"><strong>{completedTasks}/{totalTasks}</strong><span>Practice tasks</span></div></article>
      <article className="metric-card"><span className="metric-icon"><Layers3 size={24}/></span><div className="metric-copy"><strong>{projectDone}/10</strong><span>Project steps</span></div></article>
      <article className="metric-card"><span className="metric-icon"><Target size={24}/></span><div className="metric-copy"><strong>{30-completedDays}</strong><span>Days remaining</span></div></article>
    </div>
    <div className="progress-chapters">
      <div className="learning-section-heading"><div><span className="eyebrow">CHAPTER BREAKDOWN</span><h2>Progress by topic</h2><p>See how far you have moved through each stage.</p></div></div>
      <div className="progress-chapter-list glass-panel">
        {chapterStats.map(chapter=><div className="progress-chapter-row" key={chapter.key}>
          <div className="progress-chapter-icon"><chapter.icon size={20}/></div>
          <div className="progress-chapter-details"><strong>{chapter.name}</strong><span>{chapter.range}</span><div className="progress-line"><span style={{width:chapter.percent+"%"}}/></div></div>
          <span className="progress-chapter-count">{chapter.done}/{chapter.total}</span>
        </div>)}
      </div>
    </div>
  </section>;
}
export default App;
