import { Component, OnInit } from '@angular/core';
import { User } from 'interfaces/user.interface';
import { RecordService } from 'services/record.service';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss']
})
export class LeaderboardsComponent implements OnInit {

  editLeaderboard: Array<User> = [];
  learnLeaderboard: Array<User> = [];

  constructor(private recordService: RecordService) { }

  ngOnInit(): void {

    this.recordService.getEditLeaderboard()
      .then((leaderboard) => {
        this.editLeaderboard = leaderboard;
      });

    this.recordService.getLearnLeaderboard()
      .then((leaderboard) => {
        this.learnLeaderboard = leaderboard;
      });


  }

}
