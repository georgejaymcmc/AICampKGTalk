### Cell script for image
```
from IPython.display import Image

# Specify the path to your PNG file
png_path = r"D:\Projects\AICampTalk\Diagrams\PNG\zoteroWorkflow.png"

# Display the PNG file
Image(filename=png_path)
```

### Cell script for live
```
import base64
from IPython.display import Image, display


def mm(graph):
    graphbytes = graph.encode("utf8")
    base64_bytes = base64.urlsafe_b64encode(graphbytes)
    base64_string = base64_bytes.decode("ascii")
    display(Image(url="https://mermaid.ink/img/" + base64_string))


mm("""
flowchart TD
B(Master_SQLite)-->|SQL_JOIN| C(PRAGMA foreign_key_list)
C -->|RESULTS_IN| D(Foreign_Key_Table)
E(Tables.csv)
F(Foreign_key_rel.csv)
D-->|SAVE_AS|E
D-->|SAVE_AS|F
G(Neo4J)
E-->|IMPORT|G
F-->|IMPORT|G
""")
```
### bigPicture
flowchart TD
    A((User))
    B(Chatbot)
    C(KG)
    D(Codebase)
    E(LLM)
    A -->|Question|B
    B <-->|Queries + Results|C
    D -->|Metadata|C
    E <-->|Prompts + Explanation|C

### codeOverview
flowchart TD
subgraph Data KG + App KG
    A(Database)-->|Extract|I(Schema)
    I-->J(Graph data model)
    J-->K(Data KG Model) 
    B(Application code)
    B-->|Extract|L(AST)
    B-->|Extract|M(Github Search)
    B-->N(LLM)
    O(Application KG Model)
    L-->O
    M-->O
    N-->O
end

### textOverview
flowchart TD
subgraph Business Domain KG
    C(Text)-->D(Text chunking)-->E(Embedding model)
    D-->F(Entity Extraction)
    F-->E
    E-->|Lexical and Similarity|G(Ontology checking)
    G-->H(Business KG Model)
    end

### combined
flowchart TD
subgraph Linking the KGs
    A(Data KG Model)
    B(Application KG Model)
    C(Business KG Model)
    B-->|Tags| A
    C-->|Tags| B
    end

### zoteroWorkflow
flowchart TD
    B(URL)
    C(PDF)
    H(YouTube)
    B-->D(Desktop Zotero)
    D-->|tagging, notes, resource location| E(Ingest data from Zotero)
    C-->|drag-n-drop|D
    H-->D
    E-->F(Neo4j Knowledge Graph)
    F-->G(Custom search tool / Plugin)
    G-->|Plugin|D

### dataKGCodeFlow
flowchart TD
    B(Master_SQLite)-->|SQL_JOIN| C(PRAGMA foreign_key_list)
    C-->|RESULTS_IN| D(Foreign_Key_Table)
    E(Tables.csv)
    F(Foreign_key_rel.csv)
    D-->|SAVE_AS|E
    D-->|SAVE_AS|F
    G(Neo4J)
    E-->|IMPORT|G
    F-->|IMPORT|G

### appCodeSchemaDesign
flowchart TD
    subgraph Question 1: GitHub API
    A((Repo_sub_folder))-->|HOLDS|B((File_name))
    end
    subgraph Question 3: LLM
    C((CodeDoc_LLM))-->|EXPLAINS|B
    end
    B-->|MENTIONS|D((Function))
    subgraph Question 2: AST
    D -->|CONTAINS|E((Params))
    end
    D -->|REFERENCES|F((dbSchema_json))
    F-->|RELATED_TO|G((Table))
    G -->|HAS_COLUMN|H((Column))

### appCodeWorkflow1
 sequenceDiagram   
    participant C as PYTHON_LOCAL
    participant E as GITHUB
    participant F as NEO4J
    
    C->>E: 1. Query repo for metadata
    E->>C: 2. Traverse repo, download directory + file names
    C->>C: 3. Classify file types
    C->>F: 4. Create base KG (directories, file names and file types)

### appCodeWorkFlow2a
sequenceDiagram
    participant C as PYTHON_LOCAL
    participant E as GITHUB
    participant F as NEO4J
    
    C->>C: 1. Javascript Babel parser script: extract_functions.js
    C->>C: 2. Extract repo file name and location from df
    C<<->>E: 3. Request/download file from repo
    C->>C: 4. Parse file, extract functions and store in list
    C<<->>E: 5. Iterate through the df
    C->>F: 6. Merge all extracted functions with their parent files

### appCodeWorkFlow2b
sequenceDiagram
    participant A as PYTHON_LOCAL
    participant B as GITHUB
    participant C as NEO4J

    A->>B: 1. Check Github API throttling limits
    A-->>A: 2. Adjust script for rate-limit reset (60s)
    A-->>A: 3. Extract functions sequentially from JS only df
    A->>B: 4. Send function name to Github Search API
    B->>A: 5. Parse JSON file, extract file names
    A->>B: 6. Iterate through the df, repeat process
    A->>C: 7. Merge all extracted functions with parent file

### appCodeWorkFlow3
sequenceDiagram
    actor A as  Person
    participant B as Python
    participant C as ChatOpenAI API
    participant D as Neo4j
    
    A->>B: 1. Natural language
    B->>C: 2. LLM prompt
    C->>D: 3. Cypher query
    D->>C: 4. Cypher response embedded into prompt template
    C->>C: 5. LLM processing
    C->>B: 6. JSON response
    B->>B: 7. Extract content and save as markdown
    B->>D: 8. Load into `CodeDoc_GPT` node

### businessKGWorkFlow
flowchart TD
    subgraph Business Domain KG
    C(Text)-->D(Text chunking)-->E(Embedding model)
    D-->F(Entity Extraction)
    F-->E
    E-->|Lexical and Similarity|G(Ontology checking)
    G-->H(Business KG Model)
    end

