/* =========================================================
   MAPULA SANDRA MOKGEHLE
   PORTFOLIO JAVASCRIPT
   ========================================================= */


/* =========================================================
   HEADER SCROLL
   ========================================================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuButton = document.getElementById("menuButton");
const mobileNav = document.getElementById("mobileNav");

menuButton.addEventListener("click", () => {

    mobileNav.classList.toggle("active");

    menuButton.textContent =
        mobileNav.classList.contains("active")
            ? "×"
            : "☰";

});


document.querySelectorAll("#mobileNav a").forEach(link => {

    link.addEventListener("click", () => {

        mobileNav.classList.remove("active");

        menuButton.textContent = "☰";

    });

});


/* =========================================================
   REVEAL ANIMATIONS
   ========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   SKILLS
   ========================================================= */

const skillData = {

    security: [

        ["Cybersecurity Fundamentals", 85],
        ["Network Security", 78],
        ["Kali Linux", 75],
        ["Nmap", 72],
        ["Security Labs", 82],
        ["Access Control & IAM", 78]

    ],

    infrastructure: [

        ["Windows", 88],
        ["Windows Server 2019", 78],
        ["Active Directory", 80],
        ["VirtualBox", 85],
        ["Linux", 70],
        ["Networking", 78]

    ],

    database: [

        ["SQL", 88],
        ["Database Design", 85],
        ["SQL Server", 82],
        ["SSMS", 85],
        ["Power BI", 78],
        ["SSRS / Paginated Reports", 75]

    ],

    programming: [

        ["Python", 75],
        ["C#", 72],
        ["HTML", 85],
        ["CSS", 82],
        ["JavaScript", 65],
        ["Automation", 70]

    ]

};


const skillsContent =
    document.getElementById("skillsContent");


function renderSkills(category) {

    const skills = skillData[category];

    skillsContent.innerHTML = "";

    skills.forEach((skill, index) => {

        const row =
            document.createElement("div");

        row.className = "skill-row";

        row.innerHTML = `

            <div class="skill-info">

                <span>${skill[0]}</span>

                <span>${skill[1]}%</span>

            </div>

            <div class="skill-bar">

                <div
                    class="skill-progress"
                    data-level="${skill[1]}"
                ></div>

            </div>

        `;

        skillsContent.appendChild(row);

    });


    setTimeout(() => {

        document
            .querySelectorAll(".skill-progress")
            .forEach(bar => {

                bar.style.width =
                    bar.dataset.level + "%";

            });

    }, 80);

}


renderSkills("security");


document.querySelectorAll(".skill-tab")
    .forEach(tab => {

        tab.addEventListener("click", () => {

            document
                .querySelectorAll(".skill-tab")
                .forEach(t =>
                    t.classList.remove("active")
                );

            tab.classList.add("active");

            renderSkills(tab.dataset.category);

        });

    });


/* =========================================================
   TERMINAL
   ========================================================= */

const terminalForm =
    document.getElementById("terminalForm");

const terminalInput =
    document.getElementById("terminalInput");

const terminalOutput =
    document.getElementById("terminalOutput");


const terminalResponses = {

    help:
        "commands: whoami · skills · projects · contact · experience · download-cv · clear",

    whoami:
        "Mapula Sandra Mokgehle — IT student focused on Cybersecurity, Database Systems and Infrastructure.",

    skills:
        "SQL · Active Directory · Windows Server · Kali Linux · Python · Power BI · SSRS · Networking",

    projects:
        "1) Active Directory Security Lab  2) Network Security Lab  3) Database & BI Reporting  4) IoT Cybersecurity",

    experience:
        "IT WIL / Internship · Diploma IT · General Assistant — Malokaneng Primary School",

    contact:
        "sandramapula7@gmail.com · +27 82 625 4534"

};


function terminalPrint(text, type = "") {

    const line =
        document.createElement("div");

    line.textContent = text;

    if (type === "input") {
        line.className = "input-line";
    }

    if (type === "error") {
        line.className = "error";
    }

    terminalOutput.appendChild(line);

    terminalOutput.scrollTop =
        terminalOutput.scrollHeight;

}


terminalForm.addEventListener("submit", event => {

    event.preventDefault();

    const command =
        terminalInput.value
            .trim()
            .toLowerCase();

    if (!command) return;


    terminalPrint(
        `$ ${command}`,
        "input"
    );


    if (command === "clear") {

        terminalOutput.innerHTML = "";

    }

    else if (command === "download-cv") {

        const link =
            document.createElement("a");

        link.href =
            "Mapula_Mokgehle_CV.pdf";

        link.download =
            "Mapula_Mokgehle_CV.pdf";

        link.click();

        terminalPrint(
            "→ downloading Mapula_Mokgehle_CV.pdf ..."
        );

        showToast("CV download started");

    }

    else if (terminalResponses[command]) {

        terminalPrint(
            terminalResponses[command]
        );

    }

    else {

        terminalPrint(
            `command not found: ${command} — try 'help'`,
            "error"
        );

    }


    terminalInput.value = "";

});


/* =========================================================
   PROJECT MODALS
   ========================================================= */

const projectData = {

    "active-directory": {

        tag: "WINDOWS SERVER / IAM",

        title:
            "Enterprise AD Security & IAM Lab",

        description:
            "A practical Windows Server 2019 laboratory environment focused on identity and access management.",

        details: [

            "Configured Windows Server 2019 as an Active Directory Domain Controller.",

            "Created Organizational Units and user accounts.",

            "Applied role-based access control concepts.",

            "Configured password policies.",

            "Configured account lockout policies.",

            "Practiced user and identity management in an enterprise-style environment."

        ]

    },


    "network-security": {

        tag: "NETWORK SECURITY",

        title:
            "Network Security Lab",

        description:
            "A practical cybersecurity laboratory covering network security concepts and defensive controls.",

        details: [

            "Network scanning using Nmap.",

            "Firewall concepts and configuration.",

            "VPN security concepts.",

            "Intrusion detection concepts.",

            "Secure wireless networking.",

            "VirtualBox-based cybersecurity laboratories."

        ]

    },


    "database-bi": {

        tag: "DATABASE & BUSINESS INTELLIGENCE",

        title:
            "Database & BI Reporting",

        description:
            "Projects focused on database design, SQL reporting and business intelligence.",

        details: [

            "SQL database design.",

            "SQL Server and SSMS.",

            "Power BI dashboards.",

            "SSRS reporting.",

            "Paginated reports.",

            "Report Builder."

        ]

    },


    "iot": {

        tag: "IoT CYBERSECURITY",

        title:
            "IoT Cybersecurity Labs",

        description:
            "A learning roadmap focused on securing IoT devices and communication channels.",

        details: [

            "Python for cybersecurity.",

            "MQTT communication basics.",

            "TLS and certificates.",

            "Device identity and provisioning.",

            "Payload integrity.",

            "Replay attack protection."

        ]

    },


    "malware": {

        tag: "CYBERSECURITY LAB",

        title:
            "Cybersecurity Attack Labs",

        description:
            "Controlled educational security laboratories used to understand common attack techniques and defensive concepts.",

        details: [

            "Phishing incident scenarios.",

            "Privilege escalation concepts.",

            "Buffer overflow concepts.",

            "Simulated ransomware behaviour.",

            "Security analysis using isolated laboratory environments."

        ]

    },


    "python": {

        tag: "PROGRAMMING",

        title:
            "Python for Cybersecurity",

        description:
            "Python practice designed to strengthen programming and automation skills for cybersecurity.",

        details: [

            "Variables and data types.",

            "Lists, dictionaries and tuples.",

            "Loops and conditional logic.",

            "String processing.",

            "Functions and automation concepts.",

            "Cybersecurity-focused Python exercises."

        ]

    }

};


const projectModal =
    document.getElementById("projectModal");

const modalBody =
    document.getElementById("modalBody");

const modalClose =
    document.getElementById("modalClose");


document
    .querySelectorAll(".project-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            const project =
                projectData[card.dataset.project];

            if (!project) return;


            modalBody.innerHTML = `

                <div class="modal-tag">
                    // ${project.tag}
                </div>

                <h2>
                    ${project.title}
                </h2>

                <p>
                    ${project.description}
                </p>

                <ul class="modal-list">

                    ${project.details
                        .map(item =>
                            `<li>${item}</li>`
                        )
                        .join("")}

                </ul>

            `;


            projectModal.classList.add("active");

            document.body.classList.add("modal-open");

        });

    });


function closeModal() {

    projectModal.classList.remove("active");

    document.body.classList.remove("modal-open");

}


modalClose.addEventListener(
    "click",
    closeModal
);


projectModal.addEventListener(
    "click",
    event => {

        if (event.target === projectModal) {

            closeModal();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            projectModal.classList.contains("active")
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   COPY CONTACT INFORMATION
   ========================================================= */

document
    .querySelectorAll("[data-copy]")
    .forEach(button => {

        button.addEventListener(
            "click",
            async () => {

                const text =
                    button.dataset.copy;

                try {

                    await navigator.clipboard.writeText(text);

                    showToast(
                        `${text} copied to clipboard`
                    );

                } catch {

                    showToast(
                        "Unable to copy automatically"
                    );

                }

            }
        );

    });


/* =========================================================
   CONTACT FORM
   ========================================================= */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const subject =
            document.getElementById("subject").value;

        const role =
            document.getElementById("role").value;

        const message =
            document.getElementById("message").value;


        const mailSubject =
            encodeURIComponent(
                `${subject} — ${role}`
            );


        const mailBody =
            encodeURIComponent(

                `Hello Mapula,

Name: ${name}
Email: ${email}
Role: ${role}

Message:
${message}

Regards,
${name}`

            );


        window.location.href =
            `mailto:sandramapula7@gmail.com?subject=${mailSubject}&body=${mailBody}`;


        showToast(
            "Opening your email application..."
        );

    }
);


/* =========================================================
   TOAST
   ========================================================= */

const toast =
    document.getElementById("toast");

let toastTimer;


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

}


/* =========================================================
   FOOTER CLOCK
   ========================================================= */

const clock =
    document.getElementById("clock");


function updateClock() {

    const now =
        new Date();


    clock.textContent =
        now.toLocaleTimeString(
            "en-ZA",
            {
                timeZone: "Africa/Johannesburg",
                hour12: false
            }
        );

}


updateClock();

setInterval(
    updateClock,
    1000
);


/* =========================================================
   YEAR
   ========================================================= */

document.getElementById("year")
    .textContent =
    new Date().getFullYear();


/* =========================================================
   SMOOTH NAVIGATION
   ========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    targetId === "#" ||
                    targetId === "#top"
                ) {

                    return;

                }


                const target =
                    document.querySelector(targetId);

                if (!target) return;


                event.preventDefault();


                const headerHeight =
                    document
                        .getElementById("header")
                        .offsetHeight;


                const position =
                    target.offsetTop -
                    headerHeight;


                window.scrollTo({

                    top: position,

                    behavior: "smooth"

                });

            }
        );

    });


/* =========================================================
   MATRIX RAIN
   ========================================================= */

const canvas =
    document.getElementById(
        "matrixCanvas"
    );

const ctx =
    canvas.getContext("2d");


let matrixWidth;
let matrixHeight;

const characters =
    "01ACIDSQLΣ<>{}#$";


const fontSize = 14;

let columns;
let drops;


function resizeMatrix() {

    matrixWidth =
        canvas.width =
        window.innerWidth;

    matrixHeight =
        canvas.height =
        window.innerHeight;


    columns =
        Math.floor(
            matrixWidth / fontSize
        );


    drops =
        Array(columns)
            .fill(1);

}


resizeMatrix();


window.addEventListener(
    "resize",
    resizeMatrix
);


function drawMatrix() {

    ctx.fillStyle =
        "rgba(7,10,15,0.08)";

    ctx.fillRect(
        0,
        0,
        matrixWidth,
        matrixHeight
    );


    ctx.font =
        `${fontSize}px "JetBrains Mono", monospace`;


    for (
        let i = 0;
        i < drops.length;
        i++
    ) {

        const character =
            characters[
                Math.floor(
                    Math.random() *
                    characters.length
                )
            ];


        const x =
            i * fontSize;

        const y =
            drops[i] * fontSize;


        if (
            Math.random() > .975
        ) {

            ctx.fillStyle =
                "rgba(0,255,148,.55)";

        } else {

            ctx.fillStyle =
                "rgba(0,240,255,.15)";

        }


        ctx.fillText(
            character,
            x,
            y
        );


        if (
            y > matrixHeight &&
            Math.random() > .975
        ) {

            drops[i] = 0;

        }


        drops[i]++;

    }

}


let lastMatrixFrame = 0;


function matrixLoop(timestamp) {

    if (
        timestamp -
        lastMatrixFrame >
        55
    ) {

        drawMatrix();

        lastMatrixFrame =
            timestamp;

    }


    requestAnimationFrame(
        matrixLoop
    );

}


requestAnimationFrame(
    matrixLoop
);



setTimeout(() => {

    terminalInput.focus();

}, 1500);