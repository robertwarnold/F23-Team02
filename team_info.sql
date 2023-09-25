-- Create a table to store team information
CREATE TABLE team_info (
    team_number INT PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    project_description TEXT,
    version_number DECIMAL(3, 1),
    release_date DATE
);