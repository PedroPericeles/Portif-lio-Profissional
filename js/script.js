var typed = new Typed(".typing", {
  strings: ["Engenheiro de Software", "Web Developer"],
  typeSpeed: 100,
  BackSpeed: 60,
  loop: true
})

const nav = document.querySelector(".nav"),
  navlist = nav.querySelectorAll("li"),
  totalNavList = navlist.length;
for (let i = 0; i < totalNavList; i++) {
  const a = navlist[i].querySelector("a");
  a.addEventListener("click", function () {
    for (let j = 0; j < totalNavList; j++) {
      navlist[j].querySelector("a").classList.remove("active")
    }
    this.classList.add("active")
  })
}