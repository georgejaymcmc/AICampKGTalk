## Knowledge graphs for codebases

### Description

This notebook illustrates how to use knowledge graphs (KGs) to understand an 
unfamiliar codebase.

KGs are ideally suited for codebases because they are designed 
to piece together connected data. 

Using the teardown of the popular open-source 
content management application [Zotero](https://github.com/zotero/zotero/tree/main) as an example, the resulting KGs are split into 3 separate sections:

1. Data KG - created by ingesting an RDBMS schema
   - easily identifies the shortest join path between any 2 (or more) tables
   - an approach that works with a database of any size


2. Application KG - created by using:
   - the Abstract Syntax Tree to 
      extract function and parameter names, and
   - lexical search to connect all the files in the repo
   - files of interest are then sent to an LLM for a natural language explanation of what the code does


3. Business Domain KG - illustrates how to ingest a public ontology to tie-in business concepts to content


### Dependencies

1. Install [Zotero](https://www.zotero.org/download/)'s desktop application
	- for access to the SQLite RDBMS

	
2. Install `Neo4j Community edition`

   - [Desktop](https://neo4j.com/download/) version, or
   - their free [Cloud](https://neo4j.com/product/auradb/)-tier
   - [Upload](https://neo4j.com/docs/desktop-manual/current/operations/create-from-dump/) the included `dump` files to run neo4j queries and bypass the 
     data creation and ingestion step   


3. Access to an LLM

   - example uses `deepseek-coder-v2:16B` running locally via Ollama to 
	 generate code explanations
   - author has used OpenAI APIs in previous iterations
	

4. Generate a `Github Personal Access Token` 
	- to use the Github Codesearch API for its lexical search capability


### Installation

1. Sample `.env`
```

```
