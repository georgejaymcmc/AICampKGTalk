### Knowledge graphs for codebases

#### Description

This notebook illustrates how to use knowledge graphs (KGs) to understand an 
unfamiliar codebase.

KGs are ideally suited for codebases because they are designed 
to piece together connected data. 

Using the teardown of the popular open-source 
content management application [Zotero](https://github.com/zotero/zotero/tree/main) as an example, the resulting KGs are split into 3 separate sections:

1. Data KG - how ingesting an RDBMS schema into a KG helps identify the 
   shortest join path between any 2 (or more) tables, an approach that works regardless of the size of the DB.


2. Application KG - using the Abstract Syntax Tree to extract functions and 
   parameters, alongside lexical search, we can see how all the files in the 
   repo are 
   connected. 
   Files 
   of interest can also be sent to an LLM for a natural language explanation of what the code does.


3. Business Domain KG - illustrates how to ingest a public ontology to 
   tie-in business concepts to content.


#### Dependencies


#### Installation



