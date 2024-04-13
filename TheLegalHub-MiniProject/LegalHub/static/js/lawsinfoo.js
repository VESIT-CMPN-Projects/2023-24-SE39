// lawsinfoo.js

const urlParams = new URLSearchParams(window.location.search);
const buttonClicked = urlParams.get('law_selected');
console.log(buttonClicked)
if (buttonClicked) {
    // Call the fetchData function with the corresponding JSON file name
    fetchData(`${buttonClicked}.json`);
}

function fetchData(jsonFileName) {

    const jsonUrl = jsonDataUrl + jsonFileName;

    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            var contentDiv = document.getElementById('content');
            contentDiv.innerHTML = ''; // Clear previous content

            // Calculate the total number of sections
            var totalSections = data.length;

            displayDefaultContent(buttonClicked);


            // Generate and display sidebar sections
            generateSidebarSections(data, totalSections);
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });
}

// Update the generateSidebarSections function to capture specific range
function generateSidebarSections(data, totalSections) {
    var sidebarDiv = document.getElementById('sidebar');
    sidebarDiv.innerHTML = ''; // Clear previous sidebar content

    // Define the section range size (e.g., 10)
    var sectionRangeSize = 10;

    // Calculate the number of sections based on the range size
    var numberOfSections = Math.ceil(totalSections / sectionRangeSize);

    // Generate and append sidebar sections
    for (var i = 0; i < numberOfSections; i++) {
        var startSection = i * sectionRangeSize + 1;
        var endSection = (i + 1) * sectionRangeSize;

        var sidebarSection = document.createElement('button');
        sidebarSection.classList.add('sidebar-button');
        sidebarSection.textContent = `Sections ${startSection}-${endSection}`;

        // Add click event listener to display selected range
        sidebarSection.addEventListener('click', function (start, end) {
            // Use an anonymous function to capture start and end values
            return function() {
                displaySelectedRange(data, start, end);
            };
        }(startSection, endSection));

        sidebarDiv.appendChild(sidebarSection);
    }
}


// Function to display selected section range
function displaySelectedRange(data, startSection, endSection) {
    var contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear previous content

    try {
        data.forEach(function(item) {
            var sectionNumber = item["section"];

            // Check if the sectionNumber is within the selected range
            if (sectionNumber >= startSection && sectionNumber <= endSection) {
                var sectionTitle = item["section_title"];
                var sectionDesc = item["section_desc"];

                var sectionDiv = document.createElement('div');
                sectionDiv.classList.add('section');

                var sectionHeader = document.createElement('h3');
                sectionHeader.textContent = "Section " + sectionNumber + ": " + sectionTitle;
                sectionDiv.appendChild(sectionHeader);

                var descParagraph = document.createElement('p');
                descParagraph.textContent = sectionDesc;
                sectionDiv.appendChild(descParagraph);

                contentDiv.appendChild(sectionDiv);
            }
        });
    } catch (error) {
        console.error('Error parsing JSON data:', error);
    }
}

function displayDefaultContent(buttonClicked) {
    var contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear previous content

    // Get default content as HTML elements
    var defaultContent = getDefaultContent(buttonClicked);

    // Display default content
    contentDiv.appendChild(defaultContent);
}

function getDefaultContent(buttonClicked) {
    switch (buttonClicked) {

        case 'iea':
            // Example HTML content for IEA
            var ieaContent = document.createElement('div');
            ieaContent.classList.add('Default-law-content')
            ieaContent.innerHTML = '<h1>Explanation of the Indian Evidence Act (IEA)</h1><p><strong>1. Historical Context:</strong> The Indian Evidence Act (IEA) is an act passed by the British India during the British Raj. It came into force in 1872 and has been amended several times since then.</p><p><strong>2. Structure and Contents:</strong> The IEA contains provisions regarding the relevancy, admissibility, and weight of evidence in legal proceedings. It sets out rules for the proof of facts through oral and documentary evidence.</p><p><strong>3. Key Provisions:</strong> Some of the key provisions of the IEA include rules governing the examination of witnesses, the admissibility of confessions, the assessment of expert evidence, and the presumption of certain facts.</p><p><strong>4. Amendments and Reforms:</strong> The IEA has been amended over the years to address lacunae in the law and improve the administration of justice. These amendments aim to ensure fair and efficient trial proceedings and enhance the reliability of evidence presented in court.</p><p><strong>5. Role in the Legal System:</strong> The IEA plays a crucial role in the judicial process by providing a framework for the admission and assessment of evidence in court. It helps ensure the fairness and integrity of trial proceedings and facilitates the search for truth in legal disputes.</p></>';
            return ieaContent;

        case 'crpc':
            // Example HTML content for CRPC
            var crpcContent = document.createElement('div');
            crpcContent.classList.add('Default-law-content')
            crpcContent.innerHTML = '<h1>Explanation of the Code of Criminal Procedure (CrPC)</h1><p><strong>1. Historical Context:</strong> The Code of Criminal Procedure (CrPC) is a procedural law that provides the framework for the investigation and trial of criminal cases in India. It was first enacted in 1973, replacing the earlier code enacted in 1898.</p><p><strong>2. Structure and Contents:</strong> The CrPC consists of several chapters and schedules, detailing the procedures to be followed by law enforcement agencies, courts, and other stakeholders involved in criminal proceedings.</p><p><strong>3. Key Provisions:</strong> The CrPC lays down procedures for the registration of FIRs, arrest, bail, investigation, trial, and appeals. It also addresses important concepts such as bail, remand, and plea bargaining.</p><p><strong>4. Amendments and Reforms:</strong> The CrPC has been amended several times to address shortcomings and improve the efficiency of the criminal justice system. These amendments aim to ensure fair and speedy trials and protect the rights of accused persons.</p><p><strong>5. Role in the Legal System:</strong> The CrPC plays a crucial role in the Indian legal system by ensuring that criminal cases are dealt with in a fair, transparent, and expeditious manner. It lays down the procedures that govern the conduct of criminal trials and helps uphold the rule of law.</p>';
    
            return crpcContent;


        case 'ida':
            // Example HTML content for IDA
            var idaContent = document.createElement('div');
            idaContent.innerHTML = '<h1>Explanation of the Indian Divorce Act (IDA)</h1><p><strong>1. Historical Context:</strong> The Indian Divorce Act (IDA) is an act passed by the Parliament of India to regulate divorce among Christian couples. It was enacted in 1869 during the British Raj and has undergone several amendments since then.</p><p><strong>2. Structure and Contents:</strong> The IDA contains provisions related to the grounds for divorce, procedures for filing divorce petitions, and the legal consequences of divorce. It applies specifically to marriages solemnized under Christian law.</p><p><strong>3. Key Provisions:</strong> Some of the key provisions of the IDA include grounds for divorce such as adultery, cruelty, desertion, and conversion to another religion. It also provides for maintenance, custody of children, and division of property in divorce cases.</p><p><strong>4. Amendments and Reforms:</strong> The IDA has been amended over the years to address evolving social norms and legal developments. These amendments aim to ensure fairness in divorce proceedings, protect the rights of spouses and children, and promote the welfare of families.</p><p><strong>5. Role in the Legal System:</strong> The IDA plays a crucial role in governing divorce proceedings among Christian couples in India. It provides a legal framework for resolving marital disputes, protecting the interests of parties involved, and facilitating the dissolution of marriages in accordance with Christian principles and values.</p></>';
            idaContent.classList.add('Default-law-content')
            return idaContent;

            case 'cpc':
                // Example HTML content for CPC
                var cpcContent = document.createElement('div');
                cpcContent.innerHTML = '<h1>Explanation of the Code of Civil Procedure (CPC)</h1><p><strong>1. Historical Context:</strong> The Code of Civil Procedure (CPC) is a procedural law that governs the process of civil litigation in India. It was first enacted in 1908 and has undergone several amendments since then.</p><p><strong>2. Structure and Contents:</strong> The CPC is divided into parts, orders, and rules, which detail the procedures to be followed by civil courts at various stages of a civil suit. It covers matters such as jurisdiction, pleadings, evidence, and execution of decrees.</p><p><strong>3. Key Provisions:</strong> Some of the key provisions of the CPC include rules related to the institution of suits, service of summons, framing of issues, examination of witnesses, and judgment and decree.</p><p><strong>4. Amendments and Reforms:</strong> Over the years, the CPC has been amended to address emerging legal challenges and improve access to justice. These amendments aim to streamline procedures, reduce delays, and enhance the efficiency of the civil justice system.</p><p><strong>5. Role in the Legal System:</strong> The CPC plays a vital role in facilitating the resolution of civil disputes by providing a comprehensive framework for conducting civil proceedings. It ensures that parties have a fair opportunity to present their case and obtain a just and equitable remedy from the courts.</p></>';
                cpcContent.classList.add('Default-law-content')
                return cpcContent;

                case 'ipc':
                    // Example HTML content for IPC
                    var ipcContent = document.createElement('div');
                    ipcContent.innerHTML = '<h1>Explanation of the Indian Penal Code (IPC)</h1><p><strong>1. Historical Context:</strong> The Indian Penal Code (IPC) is a comprehensive criminal code enacted in 1860 during British rule in India. It aimed to consolidate and unify the diverse criminal laws prevalent in different parts of British India.</p><p><strong>2. Structure and Contents:</strong> The IPC is divided into several chapters, each dealing with specific categories of offenses. These offenses are broadly classified into substantive offenses and procedural offenses.</p><p><strong>3. Principles and Concepts:</strong> The IPC is based on fundamental principles of criminal law, such as the presumption of innocence, burden of proof, mens rea, and actus reus.</p><p><strong>4. Penalties and Punishments:</strong> The IPC prescribes penalties for different offenses, ranging from fines to imprisonment and death penalty, depending on the gravity of the offense.</p><p><strong>5. Amendments and Reforms:</strong> The IPC has undergone several amendments over the years to address emerging forms of criminal activity and ensure justice for victims.</p><p><strong>6. Role in Indian Legal System:</strong> The IPC serves as the cornerstone of the Indian legal system, governing criminal behavior, and providing the framework for law enforcement agencies and courts.</p></>';
                    ipcContent.classList.add('Default-law-content')
                    return ipcContent;

                    case 'mva':
                        // Example HTML content for mva
                        var mvaContent = document.createElement('div');
                        mvaContent.innerHTML = '<h1>Explanation of the Motor Vehicles Act (MVA)</h1><p><strong>1. Historical Context:</strong> The Motor Vehicles Act (MVA) is an act passed by the Parliament of India to regulate the operation of motor vehicles in the country. It was first enacted in 1988 and has undergone several amendments since then.</p><p><strong>2. Structure and Contents:</strong> The MVA contains provisions related to the registration, licensing, and regulation of motor vehicles, as well as rules for road safety, traffic control, and insurance requirements.</p><p><strong>3. Key Provisions:</strong> Some of the key provisions of the MVA include rules governing the issuance of driving licenses, the registration of vehicles, the use of safety equipment, and the penalties for traffic violations.</p><p><strong>4. Amendments and Reforms:</strong> The MVA has been amended over the years to address emerging challenges in road transport and enhance road safety. These amendments aim to promote responsible driving behavior, reduce accidents, and improve the overall efficiency of the transportation system.</p><p><strong>5. Role in the Legal System:</strong> The MVA plays a crucial role in ensuring the safety and efficiency of road transportation in India. It provides a legal framework for regulating the operation of motor vehicles and enforcing compliance with traffic laws, thereby contributing to public safety and mobility.</p></>';
                        mvaContent.classList.add('Default-law-content')
                        return mvaContent;

        default:
            // Default HTML content
            var defaultContent = document.createElement('div');
            defaultContent.innerHTML = '<h2>Default Content</h2><p>This is some default HTML content.</p>';
            return defaultContent;
    }
}


