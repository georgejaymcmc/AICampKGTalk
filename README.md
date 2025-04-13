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
   - lexical search to connect different file types in the repo
   - files of interest are then sent to an LLM for a 
	 natural language explanations


3. Business Domain KG - illustrates how to ingest a public ontology to tie-in business concepts to content


### Dependencies

1. Install [Zotero](https://www.zotero.org/download/)'s desktop application
	- for access to the SQLite RDBMS

	
2. Install `Neo4j Community edition`

   - [desktop](https://neo4j.com/download/) version, or
   - their free [Cloud](https://neo4j.com/product/auradb/)-tier
   - [upload](https://neo4j.com/docs/desktop-manual/current/operations/create-from-dump/) the included `dump` files to run neo4j queries and bypass the 
     data creation and ingestion step   


3. Access to an LLM

   - example uses `deepseek-coder-v2:16B` running locally via Ollama to 
	 generate code explanations
   - author has used OpenAI APIs in previous iterations
	

4. [Generate](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) a classic `Github Personal Access Token` 
	- to use the Github Codesearch API for its lexical search capability


### Installation

1. Sample `.env`
```
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=pw-for-your-neo4j-dbms
GITHUB_TOKEN=from-github
```

2. Install Python packages from `Pipfile`
```
>pip install pipenv 

>pipenv install

>pipenv shell

>pipenv graph 
```

3. Install NodeJS `babel` packages from `package.json`

- [Install](https://nodejs.org/en/download) NodeJS to traverse the 
  Javascript ASTs to extract functions, params, etc

```
>npm install
```

### Contact

For questions, suggestions, or collaborations, feel free to:
- Open an [Issue](https://github.com/georgejaymcmc/AICampKGTalk/issues)
- Email me: george@mcmc-capital.com
- Connect on [LinkedIn](https://www.linkedin.com/in/georgejaymcmc)
