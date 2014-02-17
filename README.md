This object of this project is to be able to insert html inside an RTE and the RTE should never be broken as a result.
The inserted HTML should always go directly under the line that the cursor is at

The RTE is broken at any point if the user losses their content or can't write more.

- Test cases
1. Being able to inset html when the RTE is empty 
2. Being able to insert html when the focus is not in the RTE
3. Being able to insert html when the cursor is in the middle of a line without breaking the line. content should be after the line
4. Being able to insert insert when at last line
5. Beingt able to insert in empty space between multiple lines.
