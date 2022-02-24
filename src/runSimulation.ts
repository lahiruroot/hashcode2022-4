interface Skill {
  name: string;
  level: number;
}
interface Contributor {
  name: string;
  daysToAvailable: number;
  skills: Skill[];
}
interface Role {
  skillName: string;
  requiredLevel: number;
}
interface Project {
  name: string;
  durationDays: number;
  score: number;
  assignees: Map<string, Contributor>;
  bestBefore: number;
  workedDays: number;
  roles: Skill[];
}

export const runSimulation = async (
  input: string,
  params: RunSimulationParams
) => {
  const model = parse(input);
  //console.debug("Parsed input", JSON.stringify(model, null, 2));

  const result = run(model, params);
  //console.info("Run Result", JSON.stringify(result, null, 2));

  return toOutput(result);
};

interface PlannedProject {
  name: string;
  roles: Contributor[];
}
const toOutput = (result: PlannedProject[]) => {
  const rows = [];
  rows.push(result.length);

  rows.push(
    ...result.map((proj) =>
      [proj.name, proj.roles.map((r) => r.name).join(" ")].join("\n")
    )
  );

  return rows.join("\n");
};

const parse = (input: string): Model => {
  const [first, ...rest] = input.split("\n");

  const [cont, proj] = first.split(" ");
  const numberOfContributors = Number(cont);
  const numberOfProjects = Number(proj);
  //console.warn({ numberOfContributors, numberOfProjects });

  const contributors: Contributor[] = [];
  const projects: Project[] = [];
  let currentContributor: Contributor | undefined = undefined;
  let currentProject: Project | undefined = undefined;
  let numberOfSkillsToParse = 0;

  for (let i = 0; i < rest.length; i++) {
    const currentRow = rest[i];
    if (
      contributors.length < numberOfContributors &&
      currentContributor === undefined
    ) {
      const [name, numberOfSkills] = currentRow.split(" ");
      currentContributor = { name, skills: [], daysToAvailable: 0 };
      numberOfSkillsToParse = Number(numberOfSkills);
    } else if (currentContributor && numberOfSkillsToParse > 0) {
      numberOfSkillsToParse--;
      const [name, level] = currentRow.split(" ");
      currentContributor.skills.push({ level: Number(level), name });
      if (numberOfSkillsToParse === 0) {
        contributors.push({ ...currentContributor });
        currentContributor = undefined;
      }
    } else if (
      contributors.length >= numberOfContributors &&
      currentProject === undefined
    ) {
      const [name, duration, maxPoints, bestBefore, numberOfSkills] =
        currentRow.split(" ");
      currentProject = {
        name,
        roles: [],
        bestBefore: Number(bestBefore),
        score: Number(maxPoints),
        durationDays: Number(duration),
        assignees: new Map(),
        workedDays: 0,
      };
      numberOfSkillsToParse = Number(numberOfSkills);
    } else if (currentProject && numberOfSkillsToParse > 0) {
      numberOfSkillsToParse--;
      const [name, level] = currentRow.split(" ");
      currentProject.roles.push({ name, level: Number(level) });
      if (numberOfSkillsToParse === 0) {
        projects.push({ ...currentProject });
        currentProject = undefined;
      }
    } else {
      console.warn("Sholuld not happen");
    }
  }
  return { contributors, projects };
};

const getWeight = (project: Project) => {
  return project.score / project.durationDays;
};
//const run_old = (model: Model, {}: RunSimulationParams) => {
//  const sortedProjects = [...model.projects].sort((a, b) =>
//    getWeight(a) > getWeight(b) ? 1 : -1
//  );
//  const result = sortedProjects.map((proj) => {
//    const plannedProject: PlannedProject = {
//      name: proj.name,
//      roles: proj.roles.map((role) => {
//          model.contributors.
//      }),
//      roles: model.contributors.filter((c) =>
//        c.skills.some(
//          (skill) =>
//            proj.roles.find(
//              (role) => role.name === skill.name && role.level <= skill.level
//            ) !== undefined
//        )
//      ),
//    };
//    return plannedProject;
//  });
//
//  //console.warn({ result: JSON.stringify(result, null, 2) });
//  return result;
//};
//
//
const run = (model: Model, {}: RunSimulationParams) => {
  let projects: Array<Project> = model.projects;
  let contributors: Array<Contributor> = model.contributors;

  let day = 0;

  const result: PlannedProject[] = [];
  while (projectsLeft(projects).length > 0 && day < 50) {
    day++;
    projectsLeft(projects)
      .filter((x) => x.workedDays > 0)
      .forEach((project) => {
        ++project.workedDays;

        project.assignees.forEach((value, key) => {
          --value.daysToAvailable;
          if (project.workedDays === project.durationDays) {
            let skillLevel = value.skills.find((s) => s.name === key);
            if (
              (skillLevel?.level ??
              0) <= (project.roles.find((s) => s.name === key) ?? 0)
            ) {
              if (!skillLevel) {
                value.skills.push({ name: key, level: 1 });
              } else {
                skillLevel.level++;
              }
            }
          }
        });
      });

    const availableProjects = notStartedProjects(projects);

    availableProjects.forEach((selectedProject) => {
      const projectSkills = selectedProject.roles;

      const availableProjectContributors = contributors.filter(
        (x) => x.daysToAvailable === 0
      );
      for (let skill of projectSkills) {
        const availableContributors = availableProjectContributors.filter(
          (x) => !Array.from(selectedProject.assignees.values()).includes(x)
        );
        const mentors = availableContributors.filter((y) =>
          canMentor(skill, y)
        );
        if (mentors.length > 0) {
          selectedProject.assignees.set(skill.name, mentors[0]);
        } else {
          selectedProject.assignees = new Map();
          return;
        }
      }
      if (selectedProject.assignees.size === selectedProject.roles.length) {
        selectedProject.assignees.forEach(
          (x) => (x.daysToAvailable = selectedProject.durationDays)
        );
        selectedProject.workedDays = 1;
        result.push({
          roles: Array.from(selectedProject.assignees.values()),
          name: selectedProject.name,
        });
      }
    });
    console.warn({day, result})
  }
  return result;
};

const projectsLeft = (projects: Array<Project>) =>
  projects.filter((x) => x.durationDays > x.workedDays);
const notStartedProjects = (projects: Array<Project>) =>
  projects.filter((x) => x.workedDays === 0);
const canMentor = (projectSkill: Skill, contributor: Contributor) =>
  projectSkill.level <=
  (contributor.skills.find((x) => x.name === projectSkill.name) ?? 0);

interface RunSimulationParams {}

interface Model {
  contributors: Contributor[];
  projects: Project[];
}
